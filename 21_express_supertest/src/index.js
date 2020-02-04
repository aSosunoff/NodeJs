const express = require('express');

const server = express();

server.get('/', function(req, res){
    res.send('Hello Test');
});

server.get("/error", function (req, res){
    res.status(404).send("NotFound");
});
 
server.get("/user", function (req, res){
    res.send({name:"Tom", age: 22});
});

server.listen(3000);

module.exports.server = server;