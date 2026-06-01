const express = require('express');
const { WebSocketServer } = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

console.log(`✅ WebSocket Server running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
    console.log('👤 Client connected');

    ws.on('message', (data) => {
        const userMsg = data.toString().trim();
        console.log('User said:', userMsg);

        const botReply = {
            sender: "bot",
            text: "Hello! I received: " + userMsg,
            time: new Date().toLocaleTimeString()
        };

        ws.send(JSON.stringify(botReply));
    });
});