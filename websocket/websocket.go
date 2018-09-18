package websocket

import (
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/kataras/iris"
	"github.com/kataras/iris/websocket"
)

var Conn = make(map[websocket.Connection]bool)

func init() {
	go func() {
		for {
			log.Println(Conn)
			time.Sleep(1 * time.Second)
		}
	}()

}

func SetupWebsocket(app *iris.Application) {
	// create our echo websocket server
	ws := websocket.New(websocket.Config{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	})

	// register the server on an endpoint.
	// see the inline javascript code in the websockets.html, this endpoint is used to connect to the server.
	app.Get("/echo", ws.Handler())
	app.Get("/health", ws.Handler())

	ws.OnConnection(handleConnection)

	// serve the javascript built'n client-side library,
	// see websockets.html script tags, this path is used.
	app.Any("/iris-ws.js", func(ctx iris.Context) {
		ctx.Write(websocket.ClientSource)
	})
}

func handleConnection(c websocket.Connection) {
	fmt.Printf("\nConnection with ID: %s has been connected!\n", c.ID())
	var myChatRoom = c.Context().Path()
	var mutex = new(sync.Mutex)
	// Read events from browser
	c.Join(myChatRoom)
	mutex.Lock()
	Conn[c] = true
	mutex.Unlock()
	c.On("chat", func(message string) {
		if message == "leave" {
			c.Leave(myChatRoom)
			c.To(myChatRoom).Emit("chat", "Client with ID: "+c.ID()+" left from the room and cannot send or receive message to/from this room.")
			c.Emit("chat", "You have left from the room: "+myChatRoom+" you cannot send or receive any messages from others inside that room.")
			return
		}
	})
	c.OnDisconnect(func() {
		mutex.Lock()
		delete(Conn, c)
		mutex.Unlock()
		fmt.Printf("\nConnection with ID: %s has been disconnected!\n", c.ID())
	})
}

func Broadcast(Conn map[websocket.Connection]bool, message string) {
	for k := range Conn {
		k.To("/echo").Emit("chat", message)
	}
}

func BroadcastHeath(Conn map[websocket.Connection]bool, message string) {
	for k := range Conn {
		k.To("/health").Emit("chat", message)
	}
}
