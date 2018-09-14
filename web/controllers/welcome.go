package controllers

import (
	"github.com/kataras/iris"
)

func (c *DefauleController) Welcome(ctx iris.Context) {
	ctx.View("welcome.html")
}

func (c *DefauleController) Status(ctx iris.Context) {
	id := ctx.URLParam("id")
	page := "welcome" + id + ".html"
	ctx.View(page)
}
