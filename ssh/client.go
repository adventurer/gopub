package ssh

import (
	"bytes"
	"fmt"
	"gopub/models"
	"gopub/tools"
	"gopub/websocket"
	"io/ioutil"
	"os"
	"os/user"
	"path"
	"strconv"

	"strings"
	"sync"
	"time"

	"golang.org/x/crypto/ssh"
	"golang.org/x/crypto/ssh/terminal"
)

const (
	DEFAULT_CHUNK_SIZE        = 65536
	MIN_CHUNKS                = 10
	THROUGHPUT_SLEEP_INTERVAL = 100
	MIN_THROUGHPUT            = DEFAULT_CHUNK_SIZE * MIN_CHUNKS * (1000 / THROUGHPUT_SLEEP_INTERVAL)
)

var (
	maxThroughputChan  = make(chan bool, MIN_CHUNKS)
	maxThroughput      uint64
	maxThroughputMutex sync.Mutex
)
var once sync.Once

// var client *ssh.Client
var client = make(map[string]*ssh.Client, 5)

type Client interface {
	Login()
	Cmd(clientID, cmd string) ([]byte, error)
	UploadFile(clientID, sourceFile, target string, task models.Task) (stdout, stderr string, err error)
	Test() (client *ssh.Client, err error)
	Connect() (clientID string, err error)
}

type defaultClient struct {
	clientConfig *ssh.ClientConfig
	node         *Node
}

func init() {
	go func() {
		for {
			for k, v := range client {
				if v != nil {
					// 保持ssh链接，并删除失效的
					_, _, err := v.SendRequest("keepalive", true, nil)
					if err != nil {
						tools.Logger.Warn(err)
						delete(client, k)
					}
				} else {
					delete(client, k)
				}

			}
			// log.Println(client)
			time.Sleep(2 * time.Second)
		}
	}()

}

func (c *defaultClient) Connect() (clientID string, err error) {
	clientID = c.node.Host + ":" + strconv.Itoa(c.node.Port)
	if client[clientID] != nil {
		return clientID, nil
	}
	tools.Logger.Infof("connect server ssh -p %d %s@%s\n", c.node.Port, c.node.User, c.node.Host)
	client[clientID], err = ssh.Dial("tcp", fmt.Sprintf("%s:%d", c.node.Host, c.node.Port), c.clientConfig)
	if err != nil {
		return "", err
	}
	return
}

func (c *defaultClient) Test() (client *ssh.Client, err error) {
	client, err = ssh.Dial("tcp", fmt.Sprintf("%s:%d", c.node.Host, c.node.Port), c.clientConfig)
	if err != nil {
		return
	}
	client.Close()
	return
}

func NewClient(node *Node) Client {
	u, err := user.Current()
	if err != nil {
		tools.Logger.Info(err)
		return nil
	}

	var authMethods []ssh.AuthMethod

	var pemBytes []byte
	if node.KeyPath == "" {
		pemBytes, err = ioutil.ReadFile(path.Join(u.HomeDir, ".ssh/id_rsa"))
	} else {
		pemBytes, err = ioutil.ReadFile(node.KeyPath)
	}
	if err != nil {
		tools.Logger.Info(err)
	} else {
		var signer ssh.Signer
		if node.Passphrase != "" {
			signer, err = ssh.ParsePrivateKeyWithPassphrase(pemBytes, []byte(node.Passphrase))
		} else {
			signer, err = ssh.ParsePrivateKey(pemBytes)
		}
		if err != nil {
			tools.Logger.Info(err)
		} else {
			authMethods = append(authMethods, ssh.PublicKeys(signer))
		}
	}

	password := node.password()

	if password != nil {
		interactive := func(user, instruction string, questions []string, echos []bool) (answers []string, err error) {
			answers = make([]string, len(questions))
			for n := range questions {
				answers[n] = node.Password
			}

			return answers, nil
		}
		authMethods = append(authMethods, ssh.KeyboardInteractive(interactive))
		authMethods = append(authMethods, password)
	}

	config := &ssh.ClientConfig{
		User:            node.user(),
		Auth:            authMethods,
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		Timeout:         time.Second * 10,
	}

	config.SetDefaults()
	config.Ciphers = append(config.Ciphers, "aes128-cbc", "3des-cbc", "blowfish-cbc", "cast128-cbc", "aes192-cbc", "aes256-cbc")

	return &defaultClient{
		clientConfig: config,
		node:         node,
	}
}

func (c *defaultClient) UploadFile(clientID, sourceFile, target string, task models.Task) (stdout, stderr string, err error) {
	tools.Logger.Info("cp file:" + sourceFile + " to " + target)

	currentSession, err := client[clientID].NewSession()
	if err != nil {
		tools.Logger.Warn(err)
		return
	}
	defer currentSession.Close()

	f, err := os.Open(sourceFile)
	if err != nil {
		tools.Logger.Warn(err)
		return
	}
	defer f.Close()
	data, err := ioutil.ReadAll(f)
	if err != nil {
		tools.Logger.Warn(err)
		return
	}

	cmd := "cat >'" + strings.Replace(target, "'", "'\\''", -1) + "'"
	stdinPipe, err := currentSession.StdinPipe()
	if err != nil {
		tools.Logger.Warn(err)
	}
	var stdoutBuf bytes.Buffer
	var stderrBuf bytes.Buffer
	currentSession.Stdout = &stdoutBuf
	currentSession.Stderr = &stderrBuf

	err = currentSession.Start(cmd)
	if err != nil {
		tools.Logger.Warn(err)
	}
	var tmp float32

	for start, max := 0, len(data); start < max; start += DEFAULT_CHUNK_SIZE {

		// <-maxThroughputChan
		end := start + DEFAULT_CHUNK_SIZE
		if end > max {
			end = max
		}

		_, err = stdinPipe.Write(data[start:end])
		if err != nil {
			tools.Logger.Warn(err)
			return
		}
		if (float32(end)/float32(len(data))*100)-tmp > 1.00 {
			// log.Println(float32(end)/float32(len(data))*100, "-", tmp, "=", float32(end)/float32(len(data))*100-tmp)
			websocket.Broadcast(websocket.Conn, fmt.Sprintf("upload:%s@%d:%d:%d:%d", c.node.Host, c.node.Port, task.Id, end, len(data)))
			tmp = float32(end) / float32(len(data)) * 100
		}
		if end == len(data) {
			websocket.Broadcast(websocket.Conn, fmt.Sprintf("upload:%s@%d:%d:%d:%d", c.node.Host, c.node.Port, task.Id, end, len(data)))
		}

	}

	err = stdinPipe.Close()
	if err != nil {
		tools.Logger.Warn(err)
		return
	}
	err = currentSession.Wait()
	stdout = stdoutBuf.String()
	stderr = stderrBuf.String()

	return
}

func (c *defaultClient) Cmd(clientID, cmd string) ([]byte, error) {
	session, err := client[clientID].NewSession()
	if err != nil {
		tools.Logger.Info(err)
		return nil, err
	}
	defer session.Close()

	output, error := session.CombinedOutput(cmd)
	return output, error
}

func (c *defaultClient) Login() {
	host := c.node.Host
	port := c.node.port()
	client, err := ssh.Dial("tcp", fmt.Sprintf("%s:%d", host, port), c.clientConfig)
	if err != nil {
		tools.Logger.Info(err)
		return
	}
	defer client.Close()

	tools.Logger.Info("connect server ssh -p %d %s@%s version: %s\n", port, c.node.user(), host, string(client.ServerVersion()))

	session, err := client.NewSession()
	if err != nil {
		tools.Logger.Info(err)
		return
	}
	defer session.Close()

	fd := int(os.Stdin.Fd())
	state, err := terminal.MakeRaw(fd)
	if err != nil {
		tools.Logger.Info(err)
		return
	}
	defer terminal.Restore(fd, state)

	w, h, err := terminal.GetSize(fd)
	if err != nil {
		tools.Logger.Info(err)
		return
	}

	modes := ssh.TerminalModes{
		ssh.ECHO:          1,
		ssh.TTY_OP_ISPEED: 14400,
		ssh.TTY_OP_OSPEED: 14400,
	}
	err = session.RequestPty("xterm", h, w, modes)
	if err != nil {
		tools.Logger.Info(err)
		return
	}

	session.Stdout = os.Stdout
	session.Stderr = os.Stderr
	session.Stdin = os.Stdin

	err = session.Shell()
	if err != nil {
		tools.Logger.Info(err)
		return
	}

	session.Wait()
}
