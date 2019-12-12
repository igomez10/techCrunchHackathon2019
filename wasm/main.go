package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"syscall/js"
	"time"
)

func main() {

	go checkRunningLatestJob()
	counter := 0

	for {
		//fmt.Println(time.Now().UnixNano())
		time.Sleep(1 * time.Second)

		res, err := http.Get("https://server.test-cors.org/server?id=2835400&enable=true&status=200&credentials=false")
		if err != nil {
			fmt.Println("failed to execute req ", err)
		}

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			fmt.Println("failed to parse response")
		}

		document := js.Global().Get("document")

		mock := document.Call("getElementById", "mock")

		p := document.Call("createElement", "p")
		p.Set("innerHTML", fmt.Sprintf("%+v", string(body)))

		mock.Call("appendChild", p)
		//fmt.Println(string(body))

		counter += int(time.Now().UnixNano()) / 1000000000
		counterElement := document.Call("getElementById", "opcounter")
		counterElement.Set("innerHTML", fmt.Sprintf("%d", counter))
	}
}

func checkRunningLatestJob() {
	var jobID string
	//loc := js.Global().Get("location")
	for {
		time.Sleep(1 * time.Second)
		res, err := http.Post("/api/ping", "", nil)
		if err != nil {
			fmt.Println("RELOADING COULDNT REACH HEALTH ENDPOINT")
			//loc.Call("reload")
		}

		if jobID == "" {
			jobID = res.Header.Get("jobID")
		} else if res.Header.Get("jobID") != jobID {
			//loc.Call("reload")
		}
	}
}
