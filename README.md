gopub
==============
项目说明：</br>
gopub是一款由golang语言编写的代码发布系统,适用于golang,php,java,python等脚本代码的发布。</br>

功能清单：
1. 版本文件发布
2. 版本任意切换
3. 线上文件检查
4. 发布审核
5. 版本发布记录
6. 发布后自定义命令

使用说明：
从源码构建：
编译：
1. windows:
```Bash
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o gopub main.go
```
2. linux:
```Bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o gopub main.go
```
3. macos:
```Bash
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -o gopub main.go
```

配置文件：config.json
```json
{
"Listen": ":8088",//监听端口
"DBIp":   "192.168.3.208",//数据库ip
"DBPort": "3306",//数据库端口
"DBUser": "root",//数据库用户名
"DBPass": "112215334",//数据库密码
"DBName": "pazu",//数据库名
"SqlLog": false//是否开启sql日志
}
```
请自行去掉斜杠

下载编译版本：
[下载](https://github.com/adventurer/gopub/releases/tag/latest)

	ps：欢迎fork和点赞～～
