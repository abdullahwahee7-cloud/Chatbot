const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { replyTopic } = require('./infodata');
const { detectIntent } = require('./intentDetector');

const app = express();
const server = http.createServer(app);

function makeLinks(text) {
    return text.replace(
        /((https?:\/\/|www\.)[^\s]+)/g,
        (url) => {
            const href = url.startsWith('http') ? url : `https://${url}`;
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        }
    );
}


function getTime() {
    return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Berlin'
    });
}

app.use(express.static(path.join(process.cwd(), 'frontend', 'build')));

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("socket connected");

    let session = {};

    socket.emit('chat message', {
        sender: 'chatbot',
        text: 'Hello! Welcome to Deggendorf. What would you like to know?',
        text: makeLinks(reply),
        time: getTime()
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

    socket.on('chat message', async (msg) => {
        console.log('message:', msg);

        const intent = await detectIntent(msg);
        console.log("Intent:", intent);

        let reply = replyTopic(msg, session, intent);

        if (!reply) {
            reply = "I am sorry, I'm not sure if I understand what you're looking for. Could you please try it again with a few words?\n\n" +
                    "Or you can find us by phone: +49 991 2960 5055 or send us an email: tourismus@deggendorf.de. We will be very happy to help you! :-)";
        }

        socket.emit('chat message', {
            sender: 'chatbot',
            text: reply,
            time: getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('Got disconnected!');
    });
});

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Active on port ${PORT}`);
});