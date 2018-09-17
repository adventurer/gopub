package controllers

import (
	"fmt"
	"gopub/command"
	"gopub/models"
	"path"
	"strconv"
	"strings"

	"github.com/kataras/iris"
)

type filecheck struct {
	Search int
	Id     int
	File   string
}

type fileCheckOut struct {
	Ip     string
	Output string
}

func (c *DefauleController) FileIndex(ctx iris.Context) {
	m := new(models.Project)
	list := m.List()
	ctx.ViewData("project", list)
	ctx.ViewData("id", 0)

	if ctx.Method() == "GET" {
		ctx.View("filecheck/index.html")
		return
	}

	form := filecheck{}
	err := ctx.ReadForm(&form)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}

	if form.Id == 0 {
		ctx.View("filecheck/index.html")
		return
	}

	p := new(models.Project)
	project, err := p.Find(form.Id)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}

	result := make([]fileCheckOut, 0)

	hosts := strings.Split(strings.TrimSpace(project.Hosts), ",")
	for _, v := range hosts {
		remoteEnv := new(command.Command)
		project.Hosts = v
		port := strings.Split(project.Hosts, ":")
		remoteEnv.Host = port[0]
		remoteEnv.Port, _ = strconv.Atoi(port[1])
		remoteEnv.User = project.ReleaseUser

		cmd := "cat " + project.ReleaseTo + path.Base(project.DeployFrom) + "/" + form.File
		output, err := remoteEnv.RemoteCommandOutput(cmd)
		if err != nil {
			ctx.ViewLayout(iris.NoLayout)
			ctx.ViewData("title", "文件路径不对或者我特么也不知道咋了。。。。。")
			ctx.ViewData("message", fmt.Sprintf("%s", err))
			ctx.ViewData("url", ctx.Request().Referer())
			ctx.View("error/401.html")
			return
		}
		re := fileCheckOut{Ip: v, Output: output}
		result = append(result, re)

	}

	ctx.ViewData("result", result)
	ctx.ViewData("file", form.File)
	ctx.ViewData("id", form.Id)
	ctx.View("filecheck/index.html")
}
