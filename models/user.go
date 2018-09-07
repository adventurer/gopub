package models

import "log"

// 列表
func (p *User) List() (list []User) {
	list = make([]User, 0)
	err := Xorm.Alias("o").Find(&list)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

// 新纪录
func (p *User) New() (affected int64, err error) {
	affected, err = Xorm.Alias("o").Insert(p)
	return
}

func (p *User) FindByUsername() (user User, err error) {
	user.Username = p.Username
	_, err = Xorm.Get(&user)
	if err != nil {
		log.Println(err.Error())
	}
	return
}

func (p *User) SetAccessTocken() (affected int64, err error) {
	affected, err = Xorm.Id(p.Id).Cols("auth_key").Cols("updated_at").Update(p)
	return
}

// 全部用户列表
func (u *User) GetFullList() (users []User, err error) {
	err = Xorm.Find(&users)
	return
}

// 激活用户
func (u *User) SetRoleById(id, status int) (err error) {
	user := new(User)
	user.Role = status
	_, err = Xorm.Id(id).Update(user)
	return
}

// 删除用户byid
func (u *User) DelUserById(id int) (err error) {
	user := new(User)
	_, err = Xorm.Id(id).Delete(user)
	return
}
