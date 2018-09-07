package routes

import (
	"gopub/web/controllers"

	"github.com/kataras/iris"
)

type Routes struct{}

var (
	controller = new(controllers.DefauleController)
)

func (r *Routes) InitRoute(app *iris.Application) {
	app.Get("/user/login", func(ctx iris.Context) {
		ctx.ViewLayout(iris.NoLayout)
		ctx.View("user/login.html")
	})

	app.Post("/user/login", controller.UserLoginSubmit)

	app.Get("/user/reg", func(ctx iris.Context) {
		ctx.ViewLayout(iris.NoLayout)
		ctx.View("user/reg.html")
	})

	app.Post("/user/reg", controller.UserRegisterSubmit)

	app.Get("/user/logout", controller.UserLogout)

	adminRoutes := app.Party("/", controller.SessionInit, controller.LoginCheck)
	{
		adminRoutes.Any("/welcome", controller.Welcome)

		adminRoutes.Any("/task/index", controller.TaskIndex)

		adminRoutes.Any("/task/deploy", controller.TaskDeploy)

		adminRoutes.Any("/task/choose", controller.TaskChoose)

		adminRoutes.Any("/task/new", controller.TaskNew)

		adminRoutes.Any("/task/commit", controller.TaskNewCommit)

		adminRoutes.Any("/task/filearea", controller.TaskCommitLog)

		adminRoutes.Any("/task/del", controller.TaskDel)

		adminRoutes.Any("/project/index", controller.AdminCheck, controller.ProjectIndex)

		adminRoutes.Any("/project/copy", controller.AdminCheck, controller.ProjectCopy)

		adminRoutes.Any("/project/del", controller.AdminCheck, controller.ProjectDel)

		adminRoutes.Any("/project/init", controller.AdminCheck, controller.ProjectInitialize)

		adminRoutes.Any("/project/new", controller.AdminCheck, controller.ProjectNew)

		adminRoutes.Any("/project/commit", controller.AdminCheck, controller.ProjectCommit)

		adminRoutes.Any("/project/edit", controller.AdminCheck, controller.ProjectEdit)

		adminRoutes.Any("/project/editcommit", controller.AdminCheck, controller.ProjectEditCommit)

	}
}
