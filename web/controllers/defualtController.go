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
		ctx.WriteString("need login")
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
		ctx.WriteString("access only admin")
		return
	}
	ctx.Next()
}
