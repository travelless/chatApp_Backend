import WebSocket from 'ws'
const ws = new WebSocket('ws://127.0.0.1:8080?username=ch')
ws.on('message', (data) => {
  let msg = JSON.parse(data.toString())
  console.log(msg)
})
