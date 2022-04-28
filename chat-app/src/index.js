const express = require('express')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname,'../public')


app.use(express.static(publicDirectoryPath))

// let count = 3


// server(emit) -> client (receive) - updateCount
// client(emit) -> server(receive) - increment

io.on('connection',(socket)=>{
    console.log('new websocket connection')

    socket.emit('message','Welcome to WebSocket thing')

    socket.broadcast.emit('message','A new user has joined! ')

    socket.on('message', (data,callback)=>{
       const chat = data.chat
        const filter = new Filter

        if(filter.isProfane(chat)){
            return callback('Profanity is not allowed')
        }

        io.emit('message',chat);
        callback()
    })

    socket.on('sendLocation', (coodinates,callback)=>{
       
        io.emit('locationMessage',`https://google.com/maps?q=${coodinates.latitude},${coodinates.longitude}`)
        callback('Location shared')
    })

    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left! ')
    })


    // socket.emit('updateCount',count)

    // socket.on(('increment'),()=>{
    //     count++
    //     ////socket.emit('updateCount',count)   ///  to send only on one-one
    //     io.emit('updateCount',count)
    // })
})

server.listen(port, ()=>{
    console.log(`server is up at port: ${port}`)
})

