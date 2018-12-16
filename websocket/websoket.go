package websocket

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	Clients  = make(map[*websocket.Conn]bool)
	Upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	BroadcastChan = make(chan string, 100)
)

func init() {
	go handleMessages()
}

//广播发送至页面
func handleMessages() {
	for {
		msg := <-BroadcastChan
		for client := range Clients {
			// err := client.WriteJSON(msg)
			err := client.WriteMessage(1, []byte(msg))
			if err != nil {
				log.Printf("client.WriteJSON error: %v", err)
				client.Close()
				delete(Clients, client)
			}
		}
	}
}

func Broadcast(message string) {
	BroadcastChan <- message
}
