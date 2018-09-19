package models

import (
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
)

var Xorm *xorm.Engine

func init() {
	var err error
	Xorm, err = xorm.NewEngine("mysql", "root:112215334@tcp(192.168.3.208:3306)/pazu?charset=utf8")
	if err != nil {
		panic(err.Error())
	}
	err = Xorm.Sync(new(Health), new(Project), new(Task))
	if err != nil {
		log.Println(err)
		return
	}

	// Xorm.ShowSQL(true)
	// Xorm.Logger().SetLevel(core.LOG_DEBUG)
}
