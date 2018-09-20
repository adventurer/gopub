package main

import (
	"gopub/models"
	"gopub/web/routes"
	"gopub/websocket"

	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/logger"
)

var App = iris.New()

func main() {

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
