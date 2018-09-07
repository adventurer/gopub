package controllers

import (
	"encoding/json"
	"fmt"
	"gopub/cache"
	"gopub/command"
	"gopub/models"
	"gopub/tools"
	"gopub/websocket"
	"os"
	"path"
	"strconv"
	"strings"

	"github.com/kataras/iris"
)

type taskList struct {
	Task     models.Task
	Username string
	Project  string
}

func (c *DefauleController) TaskIndex(ctx iris.Context) {
	page, err := ctx.URLParamInt("page")
	if err != nil {
		page = 1
	}
	if page < 1 {
		page = 1
	}

	projectID, _ := ctx.URLParamInt("id")

	p := new(models.Project)
	projects := p.List()

	t := new(models.Task)
	tasks := t.List(projectID, page)

	var tasklists = make([]taskList, 0)
	for _, v := range tasks {
		var task = v
		var username = cache.MemUsersIdx[v.UserId]
		var projectname = cache.MemProjectIdx[v.ProjectId]
		var tasklist taskList

		tasklist.Task = task
		tasklist.Username = username
		tasklist.Project = projectname
		tasklists = append(tasklists, tasklist)
	}
	ctx.ViewData("project", projects)
	ctx.ViewData("tasklist", tasklists)
	ctx.ViewData("page", page)
	ctx.ViewData("page1", page-1)
	ctx.ViewData("page2", page+1)
	ctx.ViewData("id", projectID)
	ctx.View("task/index.html")
}

// 部署动作
func (c *DefauleController) TaskDeploy(ctx iris.Context) {
	id, err := ctx.URLParamInt("id")

	if err != nil {
		tools.Logger.Info(err)
		return
	}
	t := new(models.Task)
	task := t.Find(id)

	p := new(models.Project)
	project, err := p.Find(task.ProjectId)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}

	switch task.FileTransmissionMode {
	case 1:
		err = fullDeploy(project, task)
	case 2:
		err = listDeploy(project, task)
	}
	if err != nil {

		tools.Logger.Info(err)
		return
	}

	t.SetStatus(task.Id, 3)

	result := models.NewDefaultReturn()
	result.Sta = 1
	blob, _ := json.Marshal(result)
	ctx.Write(blob)
}

// 完整部署
func fullDeploy(project *models.Project, task *models.Task) (err error) {

	// 更新本地代码到最新版本
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "10%", "更新本地仓库"))

	currentEnv := new(command.Command)

	err = currentEnv.LocalCommand("git -C " + project.DeployFrom + " pull")
	if err != nil {
		tools.Logger.Info(err)
		return
	}

	// 文件打包
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "20%", "打包文件"))
	destFile, err := command.Compress(project.DeployFrom, "repos/"+task.LinkId)
	if err != nil {
		tools.Logger.Info(err.Error())
		return
	}

	// 上传到服务器并链接

	hosts := strings.Split(strings.TrimSpace(project.Hosts), ",")
	for _, v := range hosts {
		remoteEnv := new(command.Command)
		project.Hosts = v
		port := strings.Split(project.Hosts, ":")
		remoteEnv.Host = port[0]
		remoteEnv.Port, _ = strconv.Atoi(port[1])
		remoteEnv.User = "root"

		// go func(remoteEnv *command.Command, project *models.Project, task *models.Task) {
		// 上传文件
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "30%", "上传压缩包"))
		err = remoteEnv.FileUpload(destFile, project.ReleaseLibrary+path.Base(project.DeployFrom)+"/"+task.LinkId+".tar.gz", *task)
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 远程释放文件
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "40%", "释放文件"))
		err = remoteEnv.RemoteCommand("tar -xvf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + ".tar.gz -C " + project.ReleaseLibrary + path.Base(project.DeployFrom))
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 链接
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "50%", "链接文件"))
		err = remoteEnv.RemoteCommand("ln -sfn " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + " " + project.ReleaseTo + path.Base(project.DeployFrom))
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 删除远程压缩包
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "60%", "删除远程压缩包"))
		err = remoteEnv.RemoteCommand("rm -rf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/*.tar.gz")
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 部署后命令
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "70%", "执行部署后命令"))
		cmds := strings.Split(strings.TrimSpace(project.PostRelease), "\r\n")
		for _, cmd := range cmds {
			err = remoteEnv.RemoteCommand(cmd)
			if err != nil {
				tools.Logger.Info(err)
				return
			}
		}
		// }(remoteEnv, project, task)

	}

	// 删除本地压缩包
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "80%", "删除本地压缩包"))
	err = os.Remove(destFile)
	if err != nil {
		tools.Logger.Info(err.Error())
		return
	}

	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "100%", "完成"))

	return
}

// 列表部署
func listDeploy(project *models.Project, task *models.Task) (err error) {
	files := strings.Split(strings.TrimSpace(task.FileList), "\r\n")
	for k, v := range files {
		files[k] = project.DeployFrom + "/" + v
	}

	// 更新本地代码到最新版本
	cmdEnv := new(command.Command)
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "10%", "更新本地仓库"))
	err = cmdEnv.LocalCommand("git -C " + project.DeployFrom + " pull")
	if err != nil {
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "10%", "更新本地仓库出错"))
		tools.Logger.Info(err)
		return
	}

	// 文件打包
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "20%", "打包文件"))
	var destFile string
	destFile, err = command.CompressFiles(files, project, "repos/"+task.LinkId)
	if err != nil {
		tools.Logger.Info(err)
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "20%", "打包文件出错"))
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("compress files err:%s", err))
		return
	}

	hosts := strings.Split(strings.TrimSpace(project.Hosts), ",")
	for _, v := range hosts {
		project.Hosts = v
		port := strings.Split(project.Hosts, ":")
		cmdEnv.Host = port[0]
		cmdEnv.Port, _ = strconv.Atoi(port[1])
		cmdEnv.User = "root"

		// go func(cmdEnv *command.Command, project *models.Project, task *models.Task) {
		// 上传服务器
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "30%", "上传压缩包"))
		err = cmdEnv.FileUpload(destFile, project.ReleaseLibrary+path.Base(project.DeployFrom)+"/"+task.LinkId+".tar.gz", *task)
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 备份当前版本
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "40%", "备份当前版本"))
		err = cmdEnv.RemoteCommand("cp -arf " + project.ReleaseTo + path.Base(project.DeployFrom) + "/. " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId)
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 合并文件
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "50%", "合并文件"))
		err = cmdEnv.RemoteCommand("tar -xvf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + ".tar.gz -C " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId)
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 链接
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "60%", "链接文件"))
		err = cmdEnv.RemoteCommand("ln -sfn " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + " " + project.ReleaseTo + path.Base(project.DeployFrom))
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 删除gz包
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "70%", "删除远程压缩包"))
		err = cmdEnv.RemoteCommand("rm -rf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/*.tar.gz")
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 部署后命令
		websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "80%", "执行部署后命令"))
		cmds := strings.Split(strings.TrimSpace(project.PostRelease), "\r\n")
		for _, cmd := range cmds {
			err := cmdEnv.RemoteCommand(cmd)
			if err != nil {
				tools.Logger.Info(err)
				return err
			}
		}
		// }(cmdEnv, project, task)
	}

	// 删除文件包
	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "90%", "删除本地压缩包"))
	err = os.Remove(destFile)
	if err != nil {
		tools.Logger.Info(err.Error())
		return
	}

	websocket.Broadcast(websocket.Conn, fmt.Sprintf("progress:%d:%s:%s", task.Id, "100%", "完成"))

	return
}
