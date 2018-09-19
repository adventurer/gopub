# gopub
	使用说明：
	从源码构建：
	编译：
	windows:
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o gopub main.go
	linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o gopub main.go
	macos:
	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -o gopub main.go

	配置文件：config.json
	{
	"Listen": ":8088",//监听端口
	"DBIp":   "192.168.3.208",//数据库ip
	"DBPort": "3306",//数据库端口
	"DBUser": "root",//数据库用户名
	"DBPass": "112215334",//数据库密码
	"DBName": "pazu",//数据库名
	"SqlLog": false//是否开启sql日志
	}
	请自行去掉斜杠

	ps：欢迎fork和点赞～～
