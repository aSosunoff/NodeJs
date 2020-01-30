const path = require('path');
const express = require('express')();
const server = require('http').Server(express);
const io = require('socket.io')(server);
const axios = require('axios');

express.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index_1.html'));
});

express.get('/query', (req, res) => {
    axios.post('http://localhost:3003/query', {
        data: 1
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
});

io.on('connection', (socket) => {
    console.log(`Client connection received ${socket.id}`);

    socket.emit('sendToClient', {
        message: 'Привет клиент'
    });

    socket.on('receivedFromClient', (data) => {
        console.log(data);
    });
});

server.listen(3000, () => {
    console.log(`HTTP server on port ${3000}`);
});

// const path = require('path');
// const server_create = require('./custom_modules/create_server');

// const server_1 = new server_create(path.resolve(__dirname, 'public/index.html'), 3000);

// server_1.run();