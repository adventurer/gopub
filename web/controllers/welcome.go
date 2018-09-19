package controllers

import (
	"github.com/kataras/iris"
)

func (c *DefauleController) Welcome(ctx iris.Context) {
	ctx.View("welcome.html")
}
