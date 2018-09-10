package controllers

import (
	"gopub/web/session"

	"github.com/kataras/iris"
	"github.com/kataras/iris/sessions"
)

type DefauleController struct {
	Sess *sessions.Session
}

// 保持登陆
func (c *DefauleController) SessionInit(ctx iris.Context) {
	c.Sess = session.Sess.Start(ctx)
	ctx.Header("Cache-Control", "no-store")
	ctx.Next()
}

// 验证登陆
func (c *DefauleController) LoginCheck(ctx iris.Context) {
	s := session.Sess.Start(ctx)
	userid, err := s.GetInt("user_id")
	if err != nil {
		ctx.WriteString("load sesson err")
		return
	}
	if userid <= 0 {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("message", "需要登陆")
		ctx.ViewData("url", `/user/login`)
		ctx.View("error/401.html")
		return
	}
	userrole := s.Get("user_role")
	username := s.Get("user_name")

	ctx.ViewData("userid", userid)
	ctx.ViewData("userrole", userrole)
	ctx.ViewData("username", username)

	ctx.Next()
}

// 验证管理员
func (c *DefauleController) AdminCheck(ctx iris.Context) {
	s := session.Sess.Start(ctx)
	userRole, err := s.GetInt("user_role")
	if err != nil {
		ctx.WriteString("load sesson err on AdminCheck")
		return
	}
	if userRole != 2 {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("message", "需要管理员身份")
		ctx.ViewData("url", ctx.Request().Referer())
		ctx.View("error/401.html")
		return
	}
	ctx.Next()
}
