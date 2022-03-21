const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(username, room);

const socket = io();

//Message from server
socket.on('message', message => { // socket.emit('message', 'Welcome to ChatCord!');
    console.log(message);
    outputMessage(message);

    //Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollheight;
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    console.log(msg);

    //Emit message to server;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
})

const outputMessage = message => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}