const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server
    .get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    })
    .post('/', (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(`<h1>Параметры</h1>`);

        let queryArr = Object.entries(req.body);
    
        for(let [key, value] of queryArr)
            res.write(`<div>{"${key}": ${value}}</div>`);
            
        res.end();
    });

server.get('/user/:id', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(`<h1>Параметры</h1>`);
    res.write(`<div>id = ${req.param('id')}</div>`);
    res.end();
});

server.listen(3000, () => {
    console.log('Server is started');
});