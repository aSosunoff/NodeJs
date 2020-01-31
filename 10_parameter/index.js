const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(`<h1>Параметры</h1>`);


    let queryArr = Object.entries(req.query);
    
    for(let [key, value] of queryArr)
        res.write(`<div>{"${key}": ${value}}</div>`);

    res.end();
});

server.listen(3000, () => {
    console.log('Server is started');
});