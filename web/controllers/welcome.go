package controllers

import (
	"fmt"
	"gopub/cache"
	"gopub/models"
	"log"

	"github.com/kataras/iris"
)

func (c *DefauleController) Welcome(ctx iris.Context) {
	// v, _ := mem.VirtualMemory()
	// fmt.Printf("Total: %v, Free:%v, UsedPercent:%f%%\n", v.Total, v.Free, v.UsedPercent)
	p := models.Task{}
	pubcount, err := p.PubCount()
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/task/index`)
		ctx.View("error/401.html")
		return
	}
	for k, v := range pubcount {
		pubcount[k].Name = cache.MemProjectIdx[v.Id]
	}

	PubCountMonth, err := p.PubCountMonth()
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/task/index`)
		ctx.View("error/401.html")
		return
	}
	for k, v := range PubCountMonth {
		PubCountMonth[k].Name = cache.MemProjectIdx[v.Id]
	}

	PubManCount, err := p.PubManCount()
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/task/index`)
		ctx.View("error/401.html")
		return
	}
	for k, v := range PubManCount {
		PubManCount[k].Name = cache.MemUsersIdx[v.Id]
	}

	PubManCountMonth, err := p.PubManCountMonth()
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/task/index`)
		ctx.View("error/401.html")
		return
	}
	for k, v := range PubManCountMonth {
		PubManCountMonth[k].Name = cache.MemUsersIdx[v.Id]
	}

	log.Printf("%#v", PubManCount)

	ctx.ViewData("pubcount", pubcount)
	ctx.ViewData("pubcountmonth", PubCountMonth)
	ctx.ViewData("pubmancount", PubManCount)
	ctx.ViewData("pubmancountmonth", PubManCountMonth)

	ctx.ViewData("count", 100+len(pubcount)*10)
	ctx.View("welcome.html")
}
