package controllers

import (
	"log"

	"github.com/kataras/iris"
)

func (c *DefauleController) Welcome(ctx iris.Context) {

	c.Sess.Set("user_id", 1)
	uid, err := c.Sess.GetInt("user_id")
	if err != nil {
		ctx.WriteString(err.Error())
		return
	}
	log.Println(uid)
	ctx.View("welcome.html")
}
