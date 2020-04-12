import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const socket = socketio(server)

app.use(express.static('public'))

const game = createGame()

socket.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Player connected with id: ${playerId}`)
    socket.emit('setup', game.state)
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})