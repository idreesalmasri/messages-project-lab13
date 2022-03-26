// "use strict"
// const client = require('socket.io-client');
// const host = "http://localhost:3000";
// const socket = client.connect(host);
// socket.on("connect",()=>{
//     console.log("connected",socket.id);
// })
// socket.emit('get_all');
// // socket.emit('send-message', "message222222")
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
const io=require("socket.io-client");

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");
const socket = io('http://localhost:3000')
const userSocket = io("http://localhost:3000/user",{ auth: {token:'ibrahim'}})
userSocket.on('connect_error',error=>{
    displayMessage(error)
})
socket.on('connect', ()=>{
    displayMessage(`you are connected with id : ${socket.id} `)
})
socket.on('recieved-message',(message)=>{
    displayMessage(message)
})
form.addEventListener("submit", e =>{
    e.preventDefault();
    const message = messageInput.value
    const room = roomInput.value
    if (message === "") return
    displayMessage(message)
    socket.emit('send-message', message,room)

    messageInput.value = ""

})
joinRoomButton.addEventListener("click", () =>{
    const room = roomInput.value;
    socket.emit('join-room', room,message=>{
        displayMessage(message)
    })
})
function displayMessage(message){
    const div = document.createElement("div")
    div.textContent = message;
    document.getElementById("message-container").append(div)
     
}
let counter =0;
setInterval(() => {
    socket.volatile.emit("ping",++counter)
}, 2000);
document.addEventListener("keydown",e=>{
    if (e.target.matches('input')) return
    if (e.key === 'c') socket.connect()
    if (e.key === 'd') socket.disconnect()

})