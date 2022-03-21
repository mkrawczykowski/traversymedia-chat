const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => { // socket.emit('message', 'Welcome to ChatCord!');
    console.log(message);
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    console.log(msg);

    //Emit message to server;
    socket.emit('chatMessage', msg);
})