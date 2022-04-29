const express = require('express')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')
const Filter = require('bad-words')
const { generateMessage,generateLocationMessage } = require('./utils/message')
const {getUser, addUser, removeUser, getUserInRoom } = require('./utils/users')

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

    socket.on('join', (options, callback)=>{
        const {erorr, user} = addUser({id:socket.id,...options})
            if(erorr){
                return callback(erorr)
            }

        socket.join(user.room)
        socket.emit('message',generateMessage('Welcome to WebSocket thing'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))
    })

    socket.on('message', (data,callback)=>{
       const chat = data.chat
        const filter = new Filter

        if(filter.isProfane(chat)){
            return callback('Profanity is not allowed')
        }

        io.emit('message',generateMessage(chat));
        callback()
    })

    socket.on('sendLocation', (coodinates,callback)=>{
       
        io.emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${coodinates.latitude},${coodinates.longitude}`))
        callback('Location shared!')
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message', generateMessage(`${user.username} has left!`))
        }
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

