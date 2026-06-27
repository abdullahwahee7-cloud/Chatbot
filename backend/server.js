const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { replyTopic } = require('./infodata')

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    'http://localhost:3000',
    'https://deggendorf-chatbot.azurewebsites.net'
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("socket connected");

    let session = {};

    socket.emit('chat message', {
        sender: 'chatbot',
        text: 'Hello! Welcome to Deggendorf. What would you like to know?',
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    });

    socket.on('reset chat', () => {
        session = {};

        socket.emit('chat message', {
            sender: 'chatbot',
            text: 'The chat has been reset. Hello! Welcome to Deggendorf. What would you like to know?',
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        });
    });

    socket.on('chat message', (msg) => {
        try {

            console.log('message:', msg);
            const reply = replyTopic(msg, session);

            socket.emit('chat message', {
              sender: 'chatbot',
              text: reply,
              time: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
              })
          });
    } catch (error) {
        console.error('Bot error:', error);

        socket.emit('chat message', {
            sender: 'chatbot',
            text: 'Sorry, something went wrong. Let us start again. What would you like to know about Deggendorf?',
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        });
      }
    });

    socket.on('disconnect', () => {
        console.log('Got disconnectd!');
    });
});

const PORT = process.env.PORT || 8080;

server.listen(8080, () => {
    console.log('Active on port 8080');
});