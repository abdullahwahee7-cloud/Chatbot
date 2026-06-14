const express = require('express');
const { Server } = require('socket.io');
const { replyTopic } = require('./infodata')

const app = express();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});