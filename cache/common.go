package cache

import (
	"gopub/models"
	"log"
)

var (
	MemUsersIdx     = make(map[int]string, 0)
	MemProjectIdx   = make(map[int]string, 0)
	MemUserHsaTable = make(map[string]models.User, 0)
	MemHealthTable  = make([]models.Health, 0)
)

func init() {
	CacheUsers()
	CacheProject()
	CacheUserHasTable()
}

func CacheUsers() {
	list := make([]models.User, 0)
	err := models.Xorm.Alias("o").Find(&list)
	if err != nil {
		log.Println(err.Error())
	}
	for _, v := range list {
		MemUsersIdx[v.Id] = v.Username
	}
}

func CacheProject() {
	list := make([]models.Project, 0)
	err := models.Xorm.Alias("o").OrderBy("Level asc").Find(&list)
	if err != nil {
		log.Println(err.Error())
	}
	for _, v := range list {
		MemProjectIdx[v.Id] = v.Name
	}
}

func CacheUserHasTable() {
	list := make([]models.User, 0)
	err := models.Xorm.Alias("o").Find(&list)
	if err != nil {
		log.Println(err.Error())
	}
	for _, v := range list {
		MemUserHsaTable[v.AuthKey] = v
	}
}

// func CacheHealthTable() {
// 	list := make([]models.Health, 0)
// 	err := models.Xorm.Alias("o").Find(&list)
// 	if err != nil {
// 		log.Println(err.Error())
// 	}
// 	MemHealthTable = list
// }
