const express = require('express');
const http = require('http');
const io = require('socket.io');
// https://socket.io/docs/
// https://www.codershood.info/2016/01/24/sending-message-specific-user-socket-io/

const app = express();
const server = new http.Server(app);
const socketServer = io(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

socketServer.on('connection', (socket) => {
	console.log(`Client connection received ${socket.id}`);

	socket.emit('sendToClient', {
		message: 'Привет клиент'
	});

	socket.on('receivedFromClient', (data) => {
		console.log(data);
	});
});

server.listen(3000, () => {
	console.log('HTTP server on port 3000');
});