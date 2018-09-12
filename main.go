package main

import (
	"gopub/command"
	"gopub/web/routes"
	"gopub/websocket"
	"log"
	"os"

	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/logger"
)

var App = iris.New()
var FILES []string

func main() {
	// log.Println(fileList("repos/waikuai.com/App"))
	// os.Exit(1)

	customLogger := logger.New(logger.Config{
		// Status displays status code
		Status: true,
		// IP displays request's remote address
		IP: true,
		// Method displays thea http method
		Method: true,
		// Path displays the request path
		Path: true,
		// Query appends the url query to the Path.
		Query: true,

		// Columns: true,

		// if !empty then its contents derives from `ctx.Values().Get("logger_message")
		// will be added to the logs.
		MessageContextKeys: []string{"logger_message"},

		// if !empty then its contents derives from `ctx.GetHeader("User-Agent")
		// MessageHeaderKeys: []string{"User-Agent"},
	})

	App.Use(customLogger)

	// App.Logger().SetLevel("debug")

	// Load the template files.
	tmpl := iris.HTML("./web/views", ".html").Layout("layouts/layout.html").Reload(true)
	App.RegisterView(tmpl)

	route := new(routes.Routes)
	route.InitRoute(App)

	App.StaticWeb("/assets", "./web/assets")

	websocket.SetupWebsocket(App)

	App.Run(iris.Addr(":8088"), iris.WithConfiguration(iris.Configuration{
		DisableStartupLog:                 false,
		DisableInterruptHandler:           false,
		DisablePathCorrection:             false,
		EnablePathEscape:                  true,
		FireMethodNotAllowed:              false,
		DisableBodyConsumptionOnUnmarshal: false,
		DisableAutoFireStatusCode:         false,
		TimeFormat:                        "Mon, 02 Jan 2006 15:04:05 GMT",
		Charset:                           "UTF-8",
	}))

}

func cmd(host, user string, port int) {
	command := new(command.Command)
	command.Host = host
	command.Port = port
	command.User = user
	for index := 0; index < 10; index++ {
		err := command.RemoteCommand("cd /home/ & ls")
		if err != nil {
			log.Println(err)
			return
		}

	}
}

func fileList(file string) (files []string) {
	f, err := os.Open(file)
	if err != nil {
		log.Println("00000", err)
		return
	}

	fInfo, err := f.Stat()
	if err != nil {
		log.Println("1", err)
		return
	}
	if fInfo.IsDir() {
		list, err := f.Readdir(0)
		if err != nil {
			log.Println("2", err)
			return
		}
		for _, v := range list {
			// log.Println(file + "/" + v.Name())

			if v.IsDir() {
				// 缺少基础路径
				fileList(file + "/" + v.Name())
			} else {
				FILES = append(FILES, file+"/"+v.Name())
				// log.Println(FILES)
			}

		}
	}
	return FILES
}
