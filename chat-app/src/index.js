const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('new web socket connection')

    socket.emit('message', 'welcome!')
    socket.broadcast.emit('message', ' a new user has joined')

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('profanity')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'a user has left')
    })
})

server.listen(port, () => {
    console.log('server is up on port ' + port)
})