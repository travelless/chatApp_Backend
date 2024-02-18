import WebSocket from 'ws'
const ws = new WebSocket('ws://127.0.0.1:8080?username=jym')
let msg = {
  reciever: 'ch',
  massage: '123',
}
let msgJSON = JSON.stringify(msg)
console.log(msgJSON)
ws.on('open', function open() {
  console.log('connected')
  ws.send(msgJSON)
})
