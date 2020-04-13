import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.subscribe(command => {
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    game.addPlayer({ playerId })

    socket.emit('setup', game.state)

    socket.on('move-player', command => {
        command.playerId = playerId
        command.type = 'move-player'
        
        game.movePlayer(command)
    })

    socket.on('disconnect', () => {
        game.removePlayer({ playerId })
    })
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})