package main

import (
	"fmt"
	"gopub/models"
	"gopub/web/routes"
	"gopub/websocket"
	"os"

	"time"

	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/logger"
)

var App = iris.New()

func main() {
	limiter := time.Tick(time.Second)

	for { //会循环两次，前面往requests channel中发送了两个值
		<-limiter //执行到这里，需要隔 200毫秒才继续往下执行，time.Tick(timer)上面已定义
		fmt.Println("request", time.Now())
	}
	os.Exit(0)

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
	tmpl := iris.HTML("./html/views", ".html").Layout("layouts/layout.html").Reload(true)
	App.RegisterView(tmpl)

	route := new(routes.Routes)
	route.InitRoute(App)

	App.StaticWeb("/assets", "./html/assets")

	websocket.SetupWebsocket(App)

	App.Run(iris.Addr(models.AppConfig.Listen), iris.WithConfiguration(iris.Configuration{
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
