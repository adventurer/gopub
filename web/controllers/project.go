package controllers

import (
	"encoding/json"
	"fmt"
	"gopub/cache"
	"gopub/command"
	"gopub/models"
	"log"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/kataras/iris"
)

func (c *DefauleController) ProjectIndex(ctx iris.Context) {
	p := new(models.Project)
	projects := p.List()
	data, _ := json.Marshal(projects)
	ctx.Write(data)
}

func (c *DefauleController) ProjectDel(ctx iris.Context) {
	id, err := ctx.URLParamInt("id")
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}

	p := models.Project{Id: id}
	p1, err := p.Find(id)
	if err != nil {
		log.Println(err)
	}
	log.Printf("%#v", p1)
	cmd := "rm -rf ./repos/" + path.Base(p1.DeployFrom)
	localCommand := new(command.Command)
	localCommand.LocalCommand(cmd)

	p.Del()
	cache.CacheProject()
	ctx.Redirect("/project/index", 302)
}

func (c *DefauleController) ProjectCopy(ctx iris.Context) {
	id, err := ctx.URLParamInt("id")
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	p := models.Project{}
	project, err := p.Find(id)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	project.Name = project.Name + "copy"
	project.Id = models.Project{}.Id
	project.CreatedAt = time.Now()
	_, err = project.New()
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	cache.CacheProject()
	ctx.Redirect("/project/index", 302)
}

func (c *DefauleController) ProjectInitialize(ctx iris.Context) {
	// 得到当前项目配置
	id := ctx.URLParam("id")
	proObj := new(models.Project)
	project, err := proObj.Find(id)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	if project.Id <= 0 {
		ctx.WriteString("未找到项目" + id)
		return
	}
	// 检查本地目录
	log.Println("检查本地目录")
	localCommand := new(command.Command)
	_, err = localCommand.PathGen(project.DeployFrom)
	if err != nil {
		log.Println(err.Error())
		return
	}

	// 检查仓库配置
	log.Println("检查仓库配置")
	_, err = localCommand.PathExists(project.DeployFrom + "/.git")
	if err != nil {
		log.Println("未找到仓库：" + project.DeployFrom)
		log.Println("初始化仓库：" + project.DeployFrom)
		cmd := "git clone -q " + project.RepoUrl + " " + project.DeployFrom
		output, err := localCommand.LocalCommandOutput(cmd)
		if err != nil {
			log.Println(err.Error(), output)
			return
		}
	} else {
		log.Println("存在仓库git目录:", project.DeployFrom+"/.git")
	}

	hosts := strings.Split(strings.TrimSpace(project.Hosts), ",")
	for _, v := range hosts {
		remoteEnv := new(command.Command)
		project.Hosts = v
		port := strings.Split(project.Hosts, ":")
		remoteEnv.Host = port[0]
		remoteEnv.Port, _ = strconv.Atoi(port[1])
		remoteEnv.User = project.ReleaseUser

		// 检查远程备份目录
		log.Println("检查远程仓库目录")
		proPos := strings.LastIndex(project.DeployFrom, "/")
		proName := project.DeployFrom[proPos+1:]

		x := models.NewDefaultReturn()

		err = remoteEnv.RemoteCommand("ls " + project.ReleaseLibrary + proName)
		if err != nil {
			log.Println("不存在远程备份目录：" + project.ReleaseLibrary + proName)
			log.Println("开始创建远程备份目录：" + project.ReleaseLibrary + proName)
			remoteEnv.RemoteCommand("mkdir -p " + project.ReleaseLibrary + proName)
			x.Msg = "创建了远程仓库目录:" + project.ReleaseLibrary + proName

			log.Println(err.Error())
		}
		x.Msg = "开始检查：" + remoteEnv.Host + "@" + strconv.Itoa(remoteEnv.Port)
		x.Msg += "存在远程仓库目录:" + project.ReleaseLibrary + proName
		log.Println("存在远程仓库目录：" + project.ReleaseLibrary + proName)

		// 检查远程项目目录
		log.Println("检查远程项目目录")
		err = remoteEnv.RemoteCommand("ls " + project.ReleaseTo)
		if err != nil {
			log.Println("不存在远程项目目录：" + project.ReleaseTo)

			x.Code = 0
			x.Msg = x.Msg + "失败,不存在远程项目目录：" + project.ReleaseTo
			ctx.WriteString(x.Msg)

		} else {
			log.Println("存在远程项目目录：" + project.ReleaseTo)

			x.Code = 1
			x.Msg = x.Msg + "，存在远程项目目录：" + project.ReleaseTo + ","
			err = remoteEnv.RemoteCommand("ls " + project.ReleaseTo + "/" + path.Base(project.DeployFrom))
			if err != nil {
				x.Msg = x.Msg + "且不存在项目：" + path.Base(project.DeployFrom)
			} else {
				x.Msg = x.Msg + "但存在项目：" + path.Base(project.DeployFrom)
			}

			ctx.WriteString(x.Msg)
		}

	}

	log.Println("初始化结束")
}

// 新增页面
func (c *DefauleController) ProjectNew(ctx iris.Context) {
	ctx.View("project/new.html")
}

// 新增提交
func (c *DefauleController) ProjectCommit(ctx iris.Context) {
	p := models.Project{}
	err := ctx.ReadForm(&p)
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
	if err != nil {
		log.Println(err)
		return
	}
	_, err = p.New()
	if err != nil {
		log.Println(err)
		return
	}
	cache.CacheProject()
	ctx.Redirect("/project/index", 302)
}

// 编辑页面
func (c *DefauleController) ProjectEdit(ctx iris.Context) {
	id := ctx.URLParam("id")
	p := models.Project{}
	project, err := p.Find(id)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	ctx.ViewData("project", project)
	ctx.View("project/edit.html")
}

// 编辑提交
func (c *DefauleController) ProjectEditCommit(ctx iris.Context) {
	p := models.Project{}
	err := ctx.ReadForm(&p)
	p.UpdatedAt = time.Now()
	if err != nil {
		log.Println(err)
		return
	}
	_, err = p.Edit()
	if err != nil {
		log.Println(err)
		return
	}
	cache.CacheProject()
	ctx.Redirect("/project/edit?id="+strconv.Itoa(p.Id), 302)
}

func (c *DefauleController) ProjectSshCheck(ctx iris.Context) {
	var message string

	user := ctx.URLParam("user")
	hosts_param := ctx.URLParam("hosts")
	hosts := strings.Split(hosts_param, ",")
	for _, v := range hosts {
		host_split := strings.Split(v, ":")
		host := host_split[0]
		port, _ := strconv.Atoi(host_split[1])
		command := command.Command{Host: host, Port: port, User: user}
		err := command.Test()
		if err != nil {
			message += "err:" + err.Error() + "\n"
		} else {
			message += "success:" + host + ":" + strconv.Itoa(port) + "\n"
		}
	}
	ctx.WriteString(message)
}

// 设定审核状态
func (c *DefauleController) ProjectAudit(ctx iris.Context) {
	id, err := ctx.URLParamInt("id")
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/project/index`)
		ctx.View("error/401.html")
		return
	}
	audit, err := ctx.URLParamInt("audit")
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/project/index`)
		ctx.View("error/401.html")
		return
	}

	result := models.NewDefaultReturn()

	p := models.Project{}
	_, err = p.SetAudit(id, audit)
	if err != nil {
		result.Msg = fmt.Sprintf("%s", err)
	}
	result.Sta = 1
	result.Msg = "成功"
	data, _ := json.Marshal(result)
	ctx.Write(data)

}

// -----------------

func (c *DefauleController) ProjectList(ctx iris.Context) {
	pro := new(models.Project)
	list := pro.List()
	blob, _ := json.Marshal(list)
	ctx.Write(blob)
}

func (c *DefauleController) Projects(ctx iris.Context) {
	blob, _ := json.Marshal(cache.MemProjectIdx)
	ctx.Write(blob)
}
