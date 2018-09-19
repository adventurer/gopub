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

	// 用户处理
	app.Get("/", func(ctx iris.Context) {
		ctx.Redirect("/user/login", 302)
	})

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

	app.Get("/401", func(ctx iris.Context) {
		ctx.ViewLayout(iris.NoLayout)
		ctx.View("error/401.html")
	})

	adminRoutes := app.Party("/", controller.SessionInit, controller.LoginCheck)
	{
		adminRoutes.Any("/welcome", controller.Welcome)

		// 任务处理

		adminRoutes.Any("/task/index", controller.TaskIndex)

		adminRoutes.Any("/task/deploy", controller.TaskDeploy)

		adminRoutes.Any("/task/choose", controller.TaskChoose)

		adminRoutes.Any("/task/new", controller.TaskNew)

		adminRoutes.Any("/task/commit", controller.TaskNewCommit)

		adminRoutes.Any("/task/filearea", controller.TaskCommitLog)

		adminRoutes.Any("/task/del", controller.TaskDel)

		adminRoutes.Any("/task/audit", controller.TaskAudit)

		// 文件检查
		adminRoutes.Any("/filecheck/index", controller.FileIndex)

		// 版本切换
		adminRoutes.Any("/version/index", controller.AdminCheck, controller.VersionIndex)

		adminRoutes.Any("/version/switch", controller.AdminCheck, controller.VersionSwitch)

		// 人员管理
		adminRoutes.Any("/user/index", controller.AdminCheck, controller.UserList)

		adminRoutes.Any("/user/del", controller.AdminCheck, controller.UserDel)

		adminRoutes.Any("/user/active", controller.AdminCheck, controller.UserActive)

		// 项目管理
		adminRoutes.Any("/project/index", controller.AdminCheck, controller.ProjectIndex)

		adminRoutes.Any("/project/copy", controller.AdminCheck, controller.ProjectCopy)

		adminRoutes.Any("/project/del", controller.AdminCheck, controller.ProjectDel)

		adminRoutes.Any("/project/init", controller.AdminCheck, controller.ProjectInitialize)

		adminRoutes.Any("/project/new", controller.AdminCheck, controller.ProjectNew)

		adminRoutes.Any("/project/commit", controller.AdminCheck, controller.ProjectCommit)

		adminRoutes.Any("/project/edit", controller.AdminCheck, controller.ProjectEdit)

		adminRoutes.Any("/project/editcommit", controller.AdminCheck, controller.ProjectEditCommit)

		adminRoutes.Any("/project/sshtest", controller.AdminCheck, controller.ProjectSshCheck)

		adminRoutes.Any("/project/audit", controller.AdminCheck, controller.ProjectAudit)

	}
}
