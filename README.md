
## Planning


### Frontend
Main page (react app): 
 - list of connected devices with ip, memory, cpu, etc.
 - Map based on ip localisation


/connect page -> serves files from filesystem directly
 - Executes the wasm, refreshes -> ping the server to show as still connected + refresh if new workload


### Server side
Ping endpoint:
 - Request: ip, device config + current job id if any
 - Add/update connected device to the list
 - Returns response: if new job, client should refresh the page
 
 
List connected devices endpoint
 - Update go script: write to file system directly, then compile and change current job id.
