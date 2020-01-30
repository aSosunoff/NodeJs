const express = require('express')();
const server = require('http').Server(express);
const io = require('socket.io')(server);

class Server {
    constructor(pathView, port){
        this.pathView = pathView;
        this.port = port;
    }

    run(){
        express.get('/', (req, res) => {
            res.sendFile(this.pathView);
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
        
        server.listen(this.port, () => {
            console.log(`HTTP server on port ${this.port}`);
        });
    }
}

module.exports = Server;