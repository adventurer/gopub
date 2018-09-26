package models

import (
	"log"
	"strconv"
	"time"
)

func (p *Task) List(id, page int, title string) (list []Task) {
	var err error
	list = make([]Task, 0)

	condition := " 1 "

	if id >= 0 {
		condition += " and project_id =  " + strconv.Itoa(id)
	}
	if title != "" {
		condition += " and title like  '%" + title + "'"
	}
	// err = Xorm.Alias("o").Where(condition, id).Limit(10, (page-1)*10).OrderBy("id desc").Find(&list)
	if condition != "" {
		err = Xorm.Alias("o").Where(condition).Limit(10, (page-1)*10).OrderBy("id desc").Find(&list)
	} else {
		err = Xorm.Alias("o").Limit(10, (page-1)*10).OrderBy("id desc").Find(&list)
	}
	if err != nil {
		log.Println(err.Error())
	}
	return
}

func (t *Task) Task(id int) (record Task) {
	// record = Task{}
	_, err := Xorm.Id(id).Get(&record)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

func (p *Task) Find(id interface{}) (record *Task) {
	record = new(Task)
	_, err := Xorm.Alias("o").Where("id=?", id).Get(record)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

// 新纪录
func (p *Task) New(task Task) (affected int64, err error) {
	affected, err = Xorm.Alias("o").Insert(task)
	return
}

// 某project最后一条记录
func (p *Task) FindLast(id interface{}) (record *Task) {
	record = new(Task)
	_, err := Xorm.Alias("o").Where("o.project_id = ?", id).And("o.status = ?", 3).OrderBy("id desc").Get(record)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

// 设置发布状态
func (p *Task) SetStatus(id, status int) (affected int64, err error) {
	task := new(Task)
	task.Id = id
	task.Status = status
	affected, err = Xorm.Id(id).Update(task)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

// 获取分页记录
func (p *Task) Page(pageNo int, records *[]Task) (err error) {
	err = Xorm.Limit(15, (pageNo-1)*15).OrderBy("id desc").Find(records)
	return
}

// 检查未完成的上线单
func (p *Task) FindUndo(id interface{}) (record *Task, err error) {
	record = new(Task)
	_, err = Xorm.Alias("o").Where("status = ? and project_id = ?", 0, id).Get(record)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

// 删除
func (p *Task) Del() (affected int64, err error) {
	affected, err = Xorm.Id(p.Id).Delete(p)
	return
}

// 设置审核
func (p *Task) SetAudit(id, audit int) (affected int64, err error) {
	task := new(Task)
	task.Id = id
	task.Audit = audit
	affected, err = Xorm.Id(id).Cols("audit").Update(task)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

// 统计发布量-全部
func (p *Task) PubCount() (pubcount []PubCount, err error) {
	sql := "select project_id Id,count(1) Cnt from task where project_id in(SELECT id from project) group by project_id order by cnt desc;"
	err = Xorm.Sql(sql).Find(&pubcount)

	return
}

// 统计发布量-本周
func (p *Task) PubCountMonth() (pubcount []PubCount, err error) {
	t := time.Now()
	// year := t.Year()
	// month := t.Month()
	// day := t.Day()
	timeStr := t.Format("2006-01")

	sql := "select project_id Id,count(1) Cnt from task where project_id in(SELECT id from project) and created_at > \"" + timeStr + "\" group by project_id order by cnt desc;"
	err = Xorm.Sql(sql).Find(&pubcount)

	return
}

// 统计发布量-全部
func (p *Task) PubManCount() (pubcount []PubCount, err error) {
	sql := "select user_id Id,count(1) Cnt from task where user_id in(SELECT id from user) group by user_id order by cnt desc;"
	err = Xorm.Sql(sql).Find(&pubcount)

	return
}

// 统计发布量-本周
func (p *Task) PubManCountMonth() (pubcount []PubCount, err error) {
	t := time.Now()
	timeStr := t.Format("2006-01")
	sql := "select user_id Id,count(1) Cnt from task where user_id in(SELECT id from user) and created_at > \"" + timeStr + "\" group by user_id order by cnt desc;"
	err = Xorm.Sql(sql).Find(&pubcount)

	return
}
