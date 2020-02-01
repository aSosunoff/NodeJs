const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.post('/data', (req, res) => {
    if(!req.body) 
        return response.sendStatus(400);
        
    res.json(req.body);
});

server.listen(3000, () => {
    console.log('Server is started');
});