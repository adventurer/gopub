package models

import (
	"log"
)

func (p *Project) List() (list []Project) {
	list = make([]Project, 0)
	err := Xorm.Alias("o").OrderBy("Level asc").Find(&list)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

func (p *Project) Find(id interface{}) (record *Project, err error) {
	record = new(Project)
	_, err = Xorm.Alias("o").Where("id=?", id).Get(record)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

// 新纪录
func (p *Project) New() (affected int64, err error) {
	affected, err = Xorm.Alias("o").Insert(p)
	return
}

// 修改
func (p *Project) Edit() (affected int64, err error) {
	log.Println(p)
	affected, err = Xorm.Id(p.Id).Cols("Name").Cols("Level").Cols("rep_url").Cols("deploy_from").Cols("release_user").Cols("release_library").Cols("release_to").Cols("Keep_version_num").Cols("repo_mode").Cols("Audit").Cols("Status").Cols("Hosts").Cols("post_release").Update(p)
	return
}

// 删除
func (p *Project) Del() (affected int64, err error) {
	affected, err = Xorm.Id(p.Id).Delete(p)
	return
}

// 设置审核状态
func (p *Project) SetAudit(id, audit int) (affected int64, err error) {
	project := new(Project)
	project.Id = id
	project.Audit = audit
	affected, err = Xorm.Id(id).Cols("audit").Update(project)
	if err != nil {
		log.Println(err.Error())
	}
	return
}
