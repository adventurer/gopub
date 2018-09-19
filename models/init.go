package models

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
)

var Xorm *xorm.Engine

func init() {
	config()
	var err error
	dns := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8", AppConfig.DBUser, AppConfig.DBPass, AppConfig.DBIp, AppConfig.DBPort, AppConfig.DBName)

	Xorm, err = xorm.NewEngine("mysql", dns)
	if err != nil {
		log.Fatal("db setup err:", err)
		return
	}

	err = Xorm.Ping()
	if err != nil {
		log.Fatal("db connection err:", err)
		return
	}

	err = Xorm.Sync(new(Project), new(Task), new(User))
	if err != nil {
		log.Println(err)
		return
	}

	Xorm.ShowSQL(AppConfig.SqlLog)
	// Xorm.Logger().SetLevel(core.LOG_DEBUG)
}

func config() {
	data, err := ioutil.ReadFile("./config.json")
	if err != nil {
		log.Fatal("读取配置文件出错：", err)
		return
	}

	err = json.Unmarshal(data, &AppConfig)
	if err != nil {
		log.Fatal("解析配置文件出错：", err)
		return
	}

}
