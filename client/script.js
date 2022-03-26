// "use strict"
// const client = require('socket.io-client');
// const host = "http://localhost:3000";
// const socket = client.connect(host);
// socket.on("connect",()=>{
//     console.log("connected",socket.id);
// })
// socket.emit('get_all');
// // socket.emit('send-message', "message")
// socket.on("receive-message", message => {
//     let payload=message.payload;
//     console.log(payload);
//     socket.emit('received', message);
    
// })

// const value3 = process.argv.splice(2); //node parent.js 'eat your food' 'go to school'
// // value3 >>> ['eat your food', 'go to school']
// value3.forEach((task) => {
//     socket.emit('send-message', task)
// })
// socket.on('added', () => {
    
//     socket.disconnect();// this is not a mandatory
// })