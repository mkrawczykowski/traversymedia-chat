const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

//Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');

    socket.emit('message', 'Welcome to ChatCord!'); // socket.on('message', message => {
    socket.broadcast.emit('message', 'A user has joined the chat'); // emits to all users except current
    // io.emit() - emits to all users

    //Runs when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has disconnected'); //emits to all users
    })

    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {`Server running on port ${PORT}`});