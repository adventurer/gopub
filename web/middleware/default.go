package middleware

import "github.com/kataras/iris"

func AccessOrigin(ctx iris.Context) {
	ctx.Header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
	ctx.Next()
}
