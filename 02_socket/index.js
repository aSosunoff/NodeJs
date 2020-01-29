const express = require('express');
const http = require('http');
const io = require('socket.io');

const app = express();
const server = new http.Server(app);
const socketServer = io(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

socketServer.on('connection', (socket) => {
	console.log('Client connection received');

	socket.emit('sendToClient', {hello: 'world'});

	socket.on('receivedFromClient', (data) => {
		console.log(data);
	});
});

server.listen(3000, () => {
	console.log('HTTP server on port 3000');
});