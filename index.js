const getQuery = (url) => {
  const str = url.substr(url.indexOf('?') + 1)
  const arr = str.split('&')
  const result = {}
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].split('=')
    result[item[0]] = item[1]
  }
  return result
}
// import koa from 'koa'
// import Router from 'koa-router'

// const port = 3000
// const app = new koa()
// const login = new Router()

// login.

// app.use(login)
// app.listen(port, () => {
//   console.log(`server is starting at port ${port}`)
// })

import { WebSocketServer } from 'ws'
const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    clientTracking: true,
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
  },
})

const sockets = {}

wss.on('connection', (ws, request) => {
  const params = getQuery(request.url)
  console.log(params)
  ws.on('message', (data) => {
    let msg = JSON.parse(data.toString())
    let reply = JSON.stringify({
      username: params.username,
      massage: msg.massage,
    })
    sockets[msg.reciever].send(reply)
  })
  sockets[params.username] = ws
  console.log(sockets)
})
