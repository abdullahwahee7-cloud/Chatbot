const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { replyTopic } = require('./infodata')
const { detectIntent } = require('./intentDetector');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connect', (socket) => {
    console.log("socket connected");

    const session = {};

    socket.emit('chat message', {
        sender: 'chatbot',
        text: 'Hello! Welcome to Deggendorf. What would you like to know?',
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    });

    socket.on('chat message', async (msg) => {
        console.log('message:', msg);
        
        const intent = await detectIntent(msg);
        console.log("Intent:", intent);

        let reply = replyTopic(msg, session, intent);

        if (!reply) {
          reply = "I am sorry, I'm not sure if I understand what you're looking for.Could you please try it again with a few words? \n\n"+
                "Or you can find us by phone: +49 991 2960 5055 or send us a email: tourismus@deggendorf.de. We will be very happy to help you! :-)";
        }

        socket.emit('chat message', {
            sender: 'chatbot',
            text: reply,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        });
    });

    socket.on('disconnect', () => {
        console.log('Got disconnectd!');
    });
});

server.listen(8080, () => {
    console.log('Active on port 8080');
});