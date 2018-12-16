package controllers

import (
	"crypto/md5"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"gopub/cache"
	"gopub/models"
	"gopub/web/session"
	"log"
	"time"

	"github.com/kataras/iris"
	uuid "github.com/satori/go.uuid"
)

// 登入
func (c *DefauleController) UserLoginSubmit(ctx iris.Context) {
	type token struct {
		Token   string
		Expired int64
	}
	var accessToken token

	user := models.User{}
	if err := ctx.ReadForm(&user); err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	userNew, err := user.FindByUsername()
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
	}
	oldpass := fmt.Sprintf("%x", md5.Sum([]byte(user.PasswordHash)))
	newpass := userNew.PasswordHash

	access := base64.URLEncoding.EncodeToString(uuid.NewV3(uuid.Must(uuid.NewV4()), oldpass).Bytes())

	if oldpass == newpass {
		userNew.AuthKey = access
		userNew.UpdatedAt = time.Now()
		userNew.SetAccessTocken()

		s := session.Sess.Start(ctx)
		s.Set("user_id", userNew.Id)
		s.Set("user_role", userNew.Role)
		s.Set("user_name", userNew.Username)

		// 登陆后必须刷新缓存
		cache.CacheUserHasTable()
		cache.CacheUsers()

		ctx.SetCookieKV("token", access)

		accessToken.Token = access
		accessToken.Expired = time.Now().Unix()
		data, _ := json.Marshal(accessToken)
		ctx.Write(data)
	} else {
		ctx.WriteString(fmt.Sprintf("%s", "账号或密码错误"))
	}
}

// 注册提交
func (c *DefauleController) UserRegisterSubmit(ctx iris.Context) {
	user := models.User{}
	if err := ctx.ReadForm(&user); err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	user.Status = 0
	user.CreatedAt = time.Now()
	has := md5.Sum([]byte(user.PasswordHash))
	user.PasswordHash = fmt.Sprintf("%x", has)
	if _, err := user.New(); err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	ctx.Redirect("/user/login")
}

// 登出
func (c *DefauleController) UserLogout(ctx iris.Context) {
	s := session.Sess.Start(ctx)
	s.Set("user_id", 0)
	s.Set("user_role", 0)
	s.Set("user_name", "")
	ctx.Redirect("/user/login", 302)
}

// 激活
func (c *DefauleController) UserActive(ctx iris.Context) {
	role, err := ctx.URLParamInt("role")
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	id, err := ctx.URLParamInt("id")
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	u := models.User{}
	u.SetRoleById(id, role)
	ctx.Redirect("/user/index")
}

// 用户列表
func (c *DefauleController) UserList(ctx iris.Context) {
	u := models.User{}
	users, err := u.GetFullList()
	if err != nil {
		log.Println(err)
		return
	}
	ctx.ViewData("list", users)
	ctx.View("user/index.html")
}

// 删除
func (c *DefauleController) UserDel(ctx iris.Context) {
	id, err := ctx.URLParamInt("id")
	if err != nil {
		ctx.WriteString(fmt.Sprintf("%s", err))
		return
	}
	u := models.User{}
	u.DelUserById(id)
	ctx.Redirect("/user/index")
}
