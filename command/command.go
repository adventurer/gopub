package command

import (
	"fmt"
	"gopub/models"
	"gopub/ssh"
	"gopub/tools"
	"gopub/websocket"
	"os"
	"os/exec"
	"sync"
)

type Command struct {
	Host string
	Port int
	User string
}

var once sync.Once

func (c *Command) setup() ssh.Client {
	node := ssh.Node{Host: c.Host, Port: c.Port, User: c.User}
	client := ssh.NewClient(&node)
	return client
}

func (c *Command) Test() error {
	_, err := c.setup().Test()
	return err
}

func (c *Command) RemoteCommand(cmd string) error {
	//当存在其他端口时分割host得到端口
	client := c.setup()
	clientID, err := client.Connect()
	if err != nil {
		return err
	}
	tools.Logger.Infof("run remote command@%s@%d:%s", c.Host, c.Port, cmd)
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("run remote command@%s@%d:%s", c.Host, c.Port, cmd))

	output, err := client.Cmd(clientID, cmd)
	if err == nil && len(output) <= 0 {
		output = []byte("success")
	}
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("result@%s@%d:%s", c.Host, c.Port, output))
	tools.Logger.Info("\t", string(output))

	return err
}

func (c *Command) LocalCommand(cmd string) error {
	var output []byte
	var err error
	var handel *exec.Cmd
	// 执行单个shell命令时, 直接运行即可
	tools.Logger.Info("run local command:", cmd)
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("run local command:%s", cmd))

	handel = exec.Command("/bin/sh", "-c", cmd)
	output, err = handel.Output()

	tools.Logger.Info("\t", string(output))
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("result:%s", output))

	return err
}

func (c *Command) RemoteCommandOutput(cmd string) (output string, err error) {
	//当存在其他端口时分割host得到端口
	client := c.setup()
	clientID, err := client.Connect()
	if err != nil {
		return "", err
	}
	tools.Logger.Info("run remote command:", cmd)

	result, err := client.Cmd(clientID, cmd)
	output = string(result)

	return
}

func (c *Command) LocalCommandOutput(cmd string) (output []byte, err error) {

	var handel *exec.Cmd
	// 执行单个shell命令时, 直接运行即可
	tools.Logger.Info("run local command:", cmd)

	handel = exec.Command("/bin/sh", "-c", cmd)
	output, err = handel.Output()
	tools.Logger.Info("\t", string(output))

	return output, err
}

func (c *Command) FileUpload(sourceFile, destFile string, task models.Task) error {
	client := c.setup()
	clientID, err := client.Connect()
	if err != nil {
		return err
	}
	output, errput, err := client.UploadFile(clientID, sourceFile, destFile, task)
	tools.Logger.Info("upload file:", string(output), string(errput))
	return err
}

// 判断文件夹是否存在,不存在则创建
func (c *Command) PathGen(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		tools.Logger.Info("目录存在：", path)
		return true, nil
	}
	if os.IsNotExist(err) {
		tools.Logger.Info("目录不存在：", path)
		tools.Logger.Info("开始创建目录", path)
		err := os.MkdirAll(path, os.ModePerm)
		if err != nil {
			tools.Logger.Info(err.Error())
			return false, err
		}
		return true, err
	}
	return true, err
}

// 判断目录是否存在

func (c *Command) PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, err
	}
	return false, err
}
