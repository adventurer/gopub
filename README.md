gopub
==============
项目说明：</br>
gopub是一款由golang语言编写的代码发布系统,适用于golang,php,java,python等脚本代码的发布。</br>
[demo查看](http://demo.golangpub.com)</br>
用户名：wuyang
密码：w123123

依赖：
1. ssh免密码登陆
```Bash
ssh-keygen -t rsa
```
一路回车以后将生成的id_rsa.pub内容复制进服务器用户目录authorized_keys文件中。详细请参考相关教程。这里推荐一篇</br>
[阮一峰的ssh登陆教程](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)</br>
最后，如果需安装本软件的机器如果可以免密码登陆服务器，即可正常使用本软件了</br>


2. git v2.0.0以上</br>
[git最新版本安装教程](https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)


功能清单：
1. 版本文件发布
2. 版本任意切换
3. 线上文件检查
4. 发布审核
5. 版本发布记录
6. 发布后自定义命令
6. 多机器发布

# 使用说明：
### 从源码构建：
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

最后请将数据库user表内自己的role设置为2，具有管理员权限
```sql
update user set role = 2;
```

下载编译版本：
[下载](https://github.com/adventurer/gopub/releases/tag/latest)

	ps：欢迎fork和点赞～～
