// 'use strict'
// const io =require('socket.io')(3000);
// const uuid = require("uuid").v4;
// const msgQueue = {
//     messages: {
        
// }
// }
// io.on('connection',socket=>{
//     console.log("connected",socket.id);
//     socket.on("send-message", message => {
//         // socket.broadcast.emit("receive-message",message )
//         const id = uuid();
//         msgQueue.messages[id] = message;
//         socket.emit('added');
//         socket.broadcast.emit("receive-message",{ id: id, payload: msgQueue.messages[id] })
//         // socket.emit('receive-message', { id: id, payload: msgQueue.messages[id] });

//     })
//     socket.on('get_all', () => {
        
//         Object.keys(msgQueue.messages) 
//             .forEach((key) => {
//                 socket.emit('receive-message', { id: key, payload: msgQueue.messages[key] })
//             })
//     });
//     socket.on('received', (task) => {
//         delete msgQueue.messages[task.id];
        
//     })
// })
const {instrument} = require('@socket.io/admin-ui')
const io = require('socket.io')(3000,{
    cors :{
        origin : ['http://localhost:8080', "https://admin.socket.io"],
    },
})
const userIo= io.of('/user')
userIo.on('connection',(socket)=>{
    console.log("connected to a segment or namespace with username " +socket.username);
})
userIo.use((socket,next)=>{
    if (socket.handshake.auth.token) {
        socket.username = getUsernameFromToken(socket.handshake.auth.token)
        next()
    }
    else {
        next(new Error("please send Token"))
    }
    
})
function getUsernameFromToken(token){
return token;
}
 io.on('connection', socket=>{
     console.log('connected on id :',socket.id);
     socket.on('send-message',(message,room)=>{
         if (room === '') {
            socket.broadcast.emit('recieved-message', message)

         }else{
             socket.to(room).emit('recieved-message', message)
         }
     })
     socket.on('join-room',(room,joinedMessageCb)=>{
         socket.join(room)
         joinedMessageCb(`Joined ${room} room`)
     })
     socket.on('ping',n=>{
         console.log(n)
     })
 })

 
 instrument(io , {auth : false})