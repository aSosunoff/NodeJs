const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const server = express();
let jsonParser = bodyParser.json();
server.use(express.static(__dirname + '/public'));

server.get('/api/users', (req, res) => {
    let content = fs.readFileSync('src/users.json', 'utf8');
    let users = JSON.parse(content);
    res.send(users);
});

server.get('/api/user/:id', (req, res) => {
    let id = req.params['id'];
    let content = fs.readFileSync('src/users.json', 'utf8');
    let users = JSON.parse(content);
    let user = users.find(e => e.id == id);
    if(user)
        res.send(user);
    else
        res.sendStatus(400);
});

server.post('/api/user', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let user = {
        name: req.body.name, 
        age: req.body.age
    };
     
    let content = fs.readFileSync("src/users.json", "utf8");
    let users = JSON.parse(content);
     
    let id = Math.max.apply(Math, users.map(o => o.id));
    user.id = ++id;
    users.push(user);
    var newData = JSON.stringify(users);
    
    fs.writeFileSync("src/users.json", newData);

    res.send(user);
});

server.delete("/api/user/:id", (req, res) => {
    let id = req.params['id'];
    let data = fs.readFileSync("src/users.json", "utf8");
    let users = JSON.parse(data);
    let index = users.findIndex(e => e.id == id);

    if(index > -1){
        let user = users.splice(index, 1)[0];
        let data = JSON.stringify(users);
        fs.writeFileSync("src/users.json", data);
        res.send(user);
    }
    else{
        res.sendStatus(404);
    }
});

server.put("/api/user", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
     
    let id = req.body.id;
     
    let content = fs.readFileSync("src/users.json", "utf8");
    let users = JSON.parse(content);
    let user = users.find(e => e.id == id);

    if(user){
        user.age = req.body.age;
        user.name = req.body.name;
        let newData = JSON.stringify(users);
        fs.writeFileSync("src/users.json", newData);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

server.listen(3000);