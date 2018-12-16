package controllers

import (
	"encoding/json"
	"fmt"
	"gopub/cache"
	"gopub/command"
	"gopub/models"
	"gopub/tools"
	"gopub/web/session"
	"gopub/websocket"
	"log"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/kataras/iris"
)

type taskList struct {
	Id       int
	Project  string
	Title    string
	Files    string
	Version  string
	Status   int
	Username string
}

func (c *DefauleController) TaskIndex(ctx iris.Context) {
	page, err := ctx.URLParamInt("page")
	if err != nil {
		page = 1
	}
	if page < 1 {
		page = 1
	}

	title := ctx.URLParam("title")

	projectID, _ := ctx.URLParamInt("id")

	// p := new(models.Project)
	// projects := p.List()

	t := new(models.Task)
	tasks := t.List(projectID, page, title)

	var tasklists = make([]taskList, 0)
	for _, v := range tasks {
		var task = v
		var username = cache.MemUsersIdx[v.UserId]
		var projectname = cache.MemProjectIdx[v.ProjectId]
		var tasklist taskList

		tasklist.Id = task.Id
		tasklist.Username = username
		tasklist.Project = projectname
		tasklist.Title = task.Title
		tasklist.Files = task.FileList
		tasklist.Version = task.LinkId
		tasklist.Status = task.Status

		tasklists = append(tasklists, tasklist)
	}

	// ctx.ViewData("project", projects)
	// ctx.ViewData("tasklist", tasklists)
	// ctx.ViewData("page", page)
	// ctx.ViewData("page1", page-1)
	// ctx.ViewData("page2", page+1)
	// ctx.ViewData("id", projectID)
	// ctx.ViewData("title", title)
	// ctx.View("task/index.html")

	ctx.JSON(tasklists)
}

// 审核上线单
func (c *DefauleController) TaskAudit(ctx iris.Context) {
	id, err := ctx.URLParamInt("id")
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/task/index`)
		ctx.View("error/401.html")
		return
	}
	audit, err := ctx.URLParamInt("audit")
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/task/index`)
		ctx.View("error/401.html")
		return
	}
	t := models.Task{}
	_, err = t.SetAudit(id, audit)
	if err != nil {
		ctx.ViewLayout(iris.NoLayout)
		ctx.ViewData("title", "错误")
		ctx.ViewData("message", fmt.Sprintf("%s", err))
		ctx.ViewData("url", `/task/index`)
		ctx.View("error/401.html")
		return
	}
	ctx.Redirect("/task/index")

}

// 新任务页面
func (c *DefauleController) TaskNew(ctx iris.Context) {
	id := ctx.URLParam("id")

	t := new(models.Task)
	task, err := t.FindUndo(id)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
	}

	if task.Id > 0 {
		ctx.WriteString(fmt.Sprintf("存在未提交的项目，先提交或删除%d", task.Id))
		return
	}

	t1 := new(models.Project)
	project, err := t1.Find(id)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}

	// s := session.Sess.Start(ctx)
	// userRole, err := s.GetInt("user_role")
	// if err != nil {
	// 	ctx.Write([]byte(fmt.Sprintf("%s", err)))
	// 	return
	// }
	// if userRole != 2 && project.Level == 3 {
	// 	ctx.WriteString("只有管理员能创建线上环境")
	// 	return
	// }

	command := new(command.Command)

	_, err = command.LocalCommandOutput("ls " + project.DeployFrom)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("不存在本地项目目录，需要初始化"))
		log.Println(err)
		return
	}

	_, err = command.LocalCommandOutput("cd " + project.DeployFrom + " && " + "git pull")
	if err != nil {
		log.Println(err)
		return
	}

	branchList, err := command.LocalCommandOutput("cd " + project.DeployFrom + " && " + "git branch -a")
	if err != nil {
		log.Println(err)
		return
	}
	// fmt.Printf("%q", branchList)
	branchListArr := strings.Split((strings.TrimSpace(string(branchList))), "\n")

	logList, err := command.LocalCommandOutput("cd " + project.DeployFrom + " && " + "git log -20 --pretty=\"%h - %an - %s - %cD\"")
	if err != nil {
		log.Println(err)
		return
	}

	_, err = command.LocalCommandOutput("cd " + project.DeployFrom + " && " + "git pull")
	if err != nil {
		log.Println(err)
		return
	}
	// fmt.Printf("%q", logList)
	logListtArr := strings.Split((strings.TrimSpace(string(logList))), "\n")

	ctx.ViewData("branchList", branchListArr)
	ctx.ViewData("logList", logListtArr)
	ctx.ViewData("project", project)
	ctx.ViewData("taskId", id)
	ctx.View("task/new.html")
}

func (c *DefauleController) TaskChoose(ctx iris.Context) {
	p := models.Project{}
	list := p.List()
	data, _ := json.Marshal(list)
	ctx.Write(data)
}

// 查询版本记录
func (c *DefauleController) TaskCommitLog(ctx iris.Context) {
	params := ctx.FormValues()

	commit := params["commit"][0]
	id := params["task"][0]
	commit = commit[:7]

	t1 := new(models.Project)
	project, err := t1.Find(id)
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}

	command := new(command.Command)
	output, err := command.LocalCommandOutput("cd " + project.DeployFrom + " && " + "git log -1 " + commit + " --name-only")
	if err != nil {
		log.Println(err)
		return
	}
	// tag1 := strings.Index(string(output), "\n\n")
	// tag2 := strings.LastIndex(string(output), "\n\n")
	// var result [3]string
	// result[0] = strings.TrimSpace(string(output[:tag1]))
	// result[1] = strings.TrimSpace(string(output[tag1:tag2]))
	// result[2] = strings.TrimSpace(string(output[tag2:]))

	result := strings.Split(string(output), "\n\n")
	ctx.JSON(result)
}

// 新任务添加
func (c *DefauleController) TaskNewCommit(ctx iris.Context) {
	task := models.Task{}
	err := ctx.ReadForm(&task)
	if err != nil {
		log.Println(err)
		return
	}
	task.CommitId = task.CommitId[:7]

	s := session.Sess.Start(ctx)
	userID, err := s.GetInt("user_id")
	if err != nil {
		ctx.Write([]byte(fmt.Sprintf("%s", err)))
		return
	}
	task.UserId = userID
	task.EnableRollback = 1
	task.CreatedAt = time.Now()
	task.UpdatedAt = time.Now()

	t := new(models.Task)
	lastRecord := t.FindLast(task.ProjectId)
	task.LinkId = time.Now().Format("20060102-150405")
	task.ExLinkId = lastRecord.LinkId
	_, err = t.New(task)

	result := models.NewDefaultReturn()
	if err != nil {

		result.Sta = 0
		result.Msg = fmt.Sprintf("%s", err)
	}
	result.Sta = 1
	result.Msg = "成功"
	data, _ := json.Marshal(result)
	ctx.Write(data)
}

// 删除提交
func (c *DefauleController) TaskDel(ctx iris.Context) {
	taskID, err := ctx.URLParamInt("id")
	if err != nil {
		ctx.WriteString("need taskid")
		return
	}
	t := models.Task{Id: taskID}
	task := t.Find(taskID)

	result := models.NewDefaultReturn()
	if task.Status == 3 {
		result.Sta = 0
		result.Msg = "都上线了就别想着删除了吧"
		data, _ := json.Marshal(result)
		ctx.Write(data)
		return
	}

	s := session.Sess.Start(ctx)
	userid, err := s.GetInt("user_id")
	if err != nil {
		result.Msg = fmt.Sprintf("%s", err)
		data, _ := json.Marshal(result)
		ctx.Write(data)
		return
	}

	userrole, err := s.GetInt("user_role")
	if err != nil {

		result.Msg = fmt.Sprintf("%s", err)
		data, _ := json.Marshal(result)
		ctx.Write(data)
		return
	}

	if task.UserId != userid {
		if userrole != 2 {
			result.Msg = "不能删除其他人的上线单"
			data, _ := json.Marshal(result)
			ctx.Write(data)
			return
		}
	}

	t.Del()
	result.Sta = 1
	result.Msg = "成功"
	data, _ := json.Marshal(result)
	ctx.Write(data)
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
	if task.Audit != 0 {
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "0%", "请等待审核"))
		return
	}

	s := session.Sess.Start(ctx)
	user_id, err := s.GetInt("user_id")
	if err != nil {
		ctx.Write([]byte(fmt.Sprintf("%s", err)))
		return
	}
	if user_id != task.UserId {
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "0%", "不能部署其他人的上线单"))
		return
	}

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
	result.Msg = "成功"
	blob, _ := json.Marshal(result)
	ctx.Write(blob)
}

// 完整部署
func fullDeploy(project *models.Project, task *models.Task) (err error) {

	// 更新本地代码到最新版本
	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "10", "更新本地仓库"))

	currentEnv := new(command.Command)

	err = currentEnv.LocalCommand("git -C " + project.DeployFrom + " pull")
	if err != nil {
		tools.Logger.Info(err)
		return
	}

	// 文件打包
	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "20", "打包文件"))
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
		remoteEnv.User = project.ReleaseUser

		// 上传文件
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "30", "上传压缩包"))
		err = remoteEnv.FileUpload(destFile, project.ReleaseLibrary+path.Base(project.DeployFrom)+"/"+task.LinkId+".tar.gz", *task)
		if err != nil {
			tools.Logger.Info(err)
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "30", "上传压缩包出错"))
			return
		}
	}

	for _, v := range hosts {
		remoteEnv := new(command.Command)
		project.Hosts = v
		port := strings.Split(project.Hosts, ":")
		remoteEnv.Host = port[0]
		remoteEnv.Port, _ = strconv.Atoi(port[1])
		remoteEnv.User = project.ReleaseUser

		// 远程释放文件
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "40", "释放文件"))
		err = remoteEnv.RemoteCommand("tar -xvf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + ".tar.gz -C " + project.ReleaseLibrary + path.Base(project.DeployFrom))
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 链接
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "50", "链接文件"))
		err = remoteEnv.RemoteCommand("ln -sfn " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + " " + project.ReleaseTo + path.Base(project.DeployFrom))
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 删除远程压缩包
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "60", "删除远程压缩包"))
		err = remoteEnv.RemoteCommand("rm -rf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/*.tar.gz")
		if err != nil {
			tools.Logger.Info(err)
			return
		}

		// 部署后命令
		if project.PostRelease != "" {
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "70", "执行部署后命令"))
			cmds := strings.Split(strings.TrimSpace(project.PostRelease), "\r\n")
			for _, cmd := range cmds {
				err = remoteEnv.RemoteCommand(cmd)
				if err != nil {
					tools.Logger.Info(err)
					return
				}
			}
		}

	}

	// 删除本地压缩包
	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "80", "删除本地压缩包"))
	err = os.Remove(destFile)
	if err != nil {
		tools.Logger.Info(err.Error())
		return
	}

	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "100", "完成"))

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
	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "10", "更新本地仓库"))
	err = cmdEnv.LocalCommand("git -C " + project.DeployFrom + " pull")
	if err != nil {
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "10", "更新本地仓库出错"))
		tools.Logger.Info(err)
		return
	}

	// 文件打包
	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "20", "打包文件"))
	var destFile string
	destFile, err = command.CompressFiles(files, project, "repos/"+task.LinkId)
	if err != nil {
		tools.Logger.Info(err)
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "20", "打包文件出错"))
		websocket.Broadcast(fmt.Sprintf("compress files err:%s", err))
		return
	}

	hosts := strings.Split(strings.TrimSpace(project.Hosts), ",")
	for _, v := range hosts {
		project.Hosts = v
		port := strings.Split(project.Hosts, ":")
		cmdEnv.Host = port[0]
		cmdEnv.Port, _ = strconv.Atoi(port[1])
		cmdEnv.User = project.ReleaseUser

		// 上传服务器
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "30", "上传压缩包"))
		err = cmdEnv.FileUpload(destFile, project.ReleaseLibrary+path.Base(project.DeployFrom)+"/"+task.LinkId+".tar.gz", *task)
		if err != nil {
			tools.Logger.Info(err)
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "30", "上传压缩包出错"))
			return
		}
	}

	for _, v := range hosts {
		project.Hosts = v
		port := strings.Split(project.Hosts, ":")
		cmdEnv.Host = port[0]
		cmdEnv.Port, _ = strconv.Atoi(port[1])
		cmdEnv.User = project.ReleaseUser

		// 备份当前版本
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "40", "备份当前版本"))
		err = cmdEnv.RemoteCommand("cp -arf " + project.ReleaseTo + path.Base(project.DeployFrom) + "/. " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId)
		if err != nil {
			tools.Logger.Info(err)
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "40", "备份当前版本出错"))
			return
		}

		// 合并文件
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "50", "合并文件"))
		err = cmdEnv.RemoteCommand("tar -xvf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + ".tar.gz -C " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId)
		if err != nil {
			tools.Logger.Info(err)
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "50", "合并文件出错"))
			return
		}

		// 链接
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "60", "链接文件"))
		err = cmdEnv.RemoteCommand("ln -sfn " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/" + task.LinkId + " " + project.ReleaseTo + path.Base(project.DeployFrom))
		if err != nil {
			tools.Logger.Info(err)
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "60", "链接文件出错"))

			return
		}

		// 删除gz包
		websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "70", "删除远程压缩包"))
		err = cmdEnv.RemoteCommand("rm -rf " + project.ReleaseLibrary + path.Base(project.DeployFrom) + "/*.tar.gz")
		if err != nil {
			tools.Logger.Info(err)
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "60", "删除远程压缩包出错"))

			return
		}

		// 部署后命令
		if project.PostRelease != "" {
			websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "80", "执行部署后命令"))
			cmds := strings.Split(strings.TrimSpace(project.PostRelease), "\r\n")
			for _, cmd := range cmds {
				err := cmdEnv.RemoteCommand(cmd)
				if err != nil {
					tools.Logger.Info(err)
					return err
				}
			}
		}
	}

	// 删除文件包
	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "90", "删除本地压缩包"))
	err = os.Remove(destFile)
	if err != nil {
		tools.Logger.Info(err.Error())
		return
	}

	websocket.Broadcast(fmt.Sprintf("progress:%d:%s:%s", task.Id, "100", "完成"))

	return
}
