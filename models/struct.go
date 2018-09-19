package models

import (
	"time"
)

var AppConfig Config

type Group struct {
	Id        int `xorm:"not null pk autoincr INT(11)"`
	ProjectId int `xorm:"not null comment('项目id') INT(2)"`
	UserId    int `xorm:"not null comment('用户id') INT(32)"`
	Type      int `xorm:"default 0 comment('用户在项目中的关系类型 0普通用户， 1管理员') SMALLINT(1)"`
}

type Migration struct {
	Version   string `xorm:"not null pk VARCHAR(180)"`
	ApplyTime int    `xorm:"INT(11)"`
}

type Project struct {
	Id               int       `xorm:"not null pk autoincr INT(11)"`
	UserId           int       `xorm:"not null comment('添加项目的用户id') INT(21)"`
	Name             string    `xorm:"default 'master' comment('项目名字') VARCHAR(100)"`
	Level            int       `xorm:"not null comment('项目环境1：测试，2：仿真，3：线上') SMALLINT(1)"`
	Status           int       `xorm:"not null default 1 comment('状态0：无效，1有效') SMALLINT(1)"`
	Version          string    `xorm:"comment('线上当前版本，用于快速回滚') VARCHAR(32)"`
	RepoUrl          string    `xorm:"default '' comment('git地址') VARCHAR(200)"`
	RepoUsername     string    `xorm:"default '' comment('版本管理系统的用户名，一般为svn的用户名') VARCHAR(50)"`
	RepoPassword     string    `xorm:"default '' comment('版本管理系统的密码，一般为svn的密码') VARCHAR(100)"`
	RepoMode         string    `xorm:"default 'branch' comment('上线方式：branch/tag') VARCHAR(50)"`
	RepoType         string    `xorm:"default 'git' comment('上线方式：git/svn') VARCHAR(10)"`
	DeployFrom       string    `xorm:"not null comment('宿主机存放clone出来的文件') VARCHAR(200)"`
	Excludes         string    `xorm:"comment('要排除的文件') TEXT"`
	ReleaseUser      string    `xorm:"not null comment('目标机器用户') VARCHAR(50)"`
	ReleaseTo        string    `xorm:"not null comment('目标机器的目录，相当于nginx的root，可直接web访问') VARCHAR(200)"`
	ReleaseLibrary   string    `xorm:"not null comment('目标机器版本发布库') VARCHAR(200)"`
	Hosts            string    `xorm:"comment('目标机器列表') TEXT"`
	PreDeploy        string    `xorm:"comment('部署前置任务') TEXT"`
	PostDeploy       string    `xorm:"comment('同步之前任务') TEXT"`
	PreRelease       string    `xorm:"comment('同步之前目标机器执行的任务') TEXT"`
	PostRelease      string    `xorm:"comment('同步之后目标机器执行的任务') TEXT"`
	PostReleaseDelay int       `xorm:"not null default 0 comment('每台目标机执行post_release任务间隔/延迟时间 单位:秒') INT(11)"`
	Audit            int       `xorm:"default 0 comment('是否需要审核任务0不需要，1需要') SMALLINT(1)"`
	Ansible          int       `xorm:"not null default 0 comment('是否启用Ansible 0关闭，1开启') SMALLINT(3)"`
	KeepVersionNum   int       `xorm:"not null default 20 comment('线上版本保留数') INT(3)"`
	CreatedAt        time.Time `xorm:"comment('创建时间') DATETIME"`
	UpdatedAt        time.Time `xorm:"comment('修改时间') DATETIME"`
}

type Record struct {
	Id        int    `xorm:"not null pk autoincr INT(11)"`
	UserId    int    `xorm:"not null comment('用户id') INT(21)"`
	TaskId    int64  `xorm:"not null comment('任务id') BIGINT(21)"`
	Status    int    `xorm:"not null default 1 comment('状态1：成功，0失败') SMALLINT(1)"`
	Action    int    `xorm:"default 10 comment('任务执行到的阶段') INT(3)"`
	Command   string `xorm:"comment('运行命令') TEXT"`
	Duration  int    `xorm:"default 0 comment('耗时，单位ms') INT(10)"`
	Memo      string `xorm:"comment('日志/备注') TEXT"`
	CreatedAt int    `xorm:"default 0 comment('创建时间') INT(10)"`
}

type Session struct {
	Id     string `xorm:"not null pk VARCHAR(40)"`
	Expire int    `xorm:"INT(10)"`
	Data   []byte `xorm:"BLOB"`
}

type Task struct {
	Id                   int       `xorm:"not null pk autoincr INT(11)"`
	UserId               int       `xorm:"not null comment('用户id') INT(21)"`
	ProjectId            int       `xorm:"not null default 0 comment('项目id') INT(21)"`
	Audit                int       `xorm:"not null default 0 comment('0审核通过，1审核中') SMALLINT(1)"`
	Status               int       `xorm:"not null default 0 comment('状态0：新建提交，1审核通过，2审核拒绝，3上线完成，4上线失败') SMALLINT(1)"`
	Title                string    `xorm:"default '' comment('上线的软链号') VARCHAR(100)"`
	LinkId               string    `xorm:"default '' comment('上线的软链号') VARCHAR(20)"`
	ExLinkId             string    `xorm:"default '' comment('上一次上线的软链号') VARCHAR(20)"`
	CommitId             string    `xorm:"default '' comment('git commit id') VARCHAR(100)"`
	Branch               string    `xorm:"default 'master' comment('选择上线的分支') VARCHAR(100)"`
	FileTransmissionMode int       `xorm:"not null default 1 comment('上线文件模式: 1.全量所有文件 2.指定文件列表') SMALLINT(3)"`
	FileList             string    `xorm:"comment('文件列表，svn上线方式可能会产生') TEXT"`
	EnableRollback       int       `xorm:"not null default 1 comment('能否回滚此版本:0no 1yes') INT(1)"`
	CreatedAt            time.Time `xorm:"comment('创建时间') DATETIME"`
	UpdatedAt            time.Time `xorm:"comment('修改时间') DATETIME"`
}

type User struct {
	Id                     int       `xorm:"not null pk autoincr INT(11)"`
	Username               string    `xorm:"not null VARCHAR(255)"`
	IsEmailVerified        int       `xorm:"not null default 0 TINYINT(1)"`
	AuthKey                string    `xorm:"not null VARCHAR(32)"`
	PasswordHash           string    `xorm:"not null VARCHAR(255)"`
	PasswordResetToken     string    `xorm:"VARCHAR(255)"`
	EmailConfirmationToken string    `xorm:"VARCHAR(255)"`
	Email                  string    `xorm:"not null VARCHAR(255)"`
	Avatar                 string    `xorm:"default 'default.jpg' comment('头像图片地址') VARCHAR(100)"`
	Role                   int       `xorm:"not null default 1 SMALLINT(6)"`
	Status                 int       `xorm:"not null default 1 SMALLINT(6)"`
	CreatedAt              time.Time `xorm:"not null DATETIME"`
	UpdatedAt              time.Time `xorm:"not null DATETIME"`
	Realname               string    `xorm:"not null VARCHAR(32)"`
}

type Health struct {
	Id        int       `xorm:"not null pk autoincr INT(11)"`
	Type      int       `xorm:"not null default 0 comment('检查类型：1app，2process') SMALLINT(6)"`
	Name      string    `xorm:"not null VARCHAR(255)"`
	Url       string    `xorm:"not null VARCHAR(255)"`
	Method    string    `xorm:"not null VARCHAR(255)"`
	Interval  int       `xorm:"not null default 3 comment('检查间隔时间') SMALLINT(6)"`
	Report    int       `xorm:"not null default 10 comment('失败次数报警') SMALLINT(6)"`
	CreatedAt time.Time `xorm:"not null DATETIME"`
	UpdatedAt time.Time `xorm:"not null DATETIME"`
}

type Config struct {
	Listen string
	DBIp   string
	DBPort string
	DBUser string
	DBPass string
	DBName string
	SqlLog bool
}

type Version struct {
	Id     string `版本号`
	Active int    `是否激活`
	Task   Task   `版本上线单`
}

type BasicReturn struct {
	Sta  int         `状态吗`
	Msg  string      `消息`
	Code int         `返回码`
	Data interface{} `数据`
}

func NewDefaultReturn() BasicReturn {
	return BasicReturn{Sta: 0, Msg: "", Code: 0, Data: ""}
}
