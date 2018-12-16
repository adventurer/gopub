package controllers

import (
	"fmt"
	"gopub/web/session"
	"gopub/websocket"
	"log"

	"github.com/kataras/iris"
	"github.com/kataras/iris/sessions"
)

type DefauleController struct {
	Sess *sessions.Session
}

func (c *DefauleController) Echo(ctx iris.Context) {
	log.Println("run echo")
	ws, err := websocket.Upgrader.Upgrade(ctx.ResponseWriter().Naive(), ctx.Request(), nil)
	if err != nil {
		log.Fatal(err)
	}
	websocket.Clients[ws] = true
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
	if err != nil || userid <= 0 {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "需要登陆")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/user/login`)
		ctx.View("error/401.html")
		return
	}
	userrole, err := s.GetInt("user_role")
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "系统错误，角色类型")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/user/login`)
		ctx.View("error/401.html")
		return
	}
	if userrole <= 0 {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "登陆失败")
		ctx.ViewData("message", "请联系系统管理员开通账户")
		ctx.ViewData("url", `/user/login`)
		ctx.View("error/401.html")
		return
	}
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
		ctx.ViewData("title", "需要管理员身份")
		ctx.ViewData("message", "没有获得授权")
		ctx.ViewData("url", ctx.Request().Referer())
		ctx.View("error/401.html")
		return
	}
	ctx.Next()
}
