package models

import (
	"log"
)

func (v *Version) VersionList(ids []string) (vers []Version) {
	var version Version
	for _, v := range ids {
		log.Println(v)
		task := Task{}
		_, err := Xorm.Alias("o").Where("link_id=?", v).Get(&task)
		if err != nil {
			panic(err)
		}
		log.Println(task)
		version.Id = v
		version.Task = task
		vers = append(vers, version)
	}
	return
}
