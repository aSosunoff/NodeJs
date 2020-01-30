const path = require('path');
const express = require('express')();
const server = require('http').Server(express);
const io = require('socket.io')(server);

express.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index_2.html'));
});

express.post('/query', (req, res) => {
    console.log(req.body);
    res.send({data: 'привет с другого сервера'});
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

server.listen(3003, () => {
    console.log(`HTTP server on port ${3003}`);
});

// const path = require('path');
// const server_create = require('./custom_modules/create_server');

// const server_2 = new server_create(path.resolve(__dirname, 'public/index.html'), 3003);
// server_2.run();