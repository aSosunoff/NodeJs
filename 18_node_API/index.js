const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const promise = require('./src/getPromise');

const server = express();
const apiRouter = express.Router();
let jsonParser = bodyParser.json();

server
    .use(express.static(__dirname + '/public'))
    .listen(3000);

apiRouter.get('/users', (req, res) => {
    fs.readFile('src/users.json', 'utf8', (err, data) => {
        if(err)
            res.sendStatus(400);
            
        let users = JSON.parse(data);
        res.send(users);
    });
});

apiRouter.get('/user/:id', (req, res) => {
    let id = req.params['id'];
    fs.readFile('src/users.json', 'utf8', (err, data) => {
        if(err)
            res.sendStatus(400);

        let users = JSON.parse(data);
        let user = users.find(e => e.id == id);
        if(user)
            res.send(user);
        else
            res.sendStatus(400);
    });   
});

apiRouter.post('/user', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let user = {
        name: req.body.name, 
        age: req.body.age
    };
    
    promise((resolve, reject) => {
        fs.readFile("src/users.json", "utf8", (err, data) => {
            if(err)
                reject(err);
    
            let users = JSON.parse(data);
    
            let id = Math.max.apply(Math, users.map(o => o.id));
            user.id = ++id;
            users.push(user);
            var newData = JSON.stringify(users);

            resolve({
                newData: newData,
                user: user
            });
        });
    }).then(data => {
        fs.writeFile("src/users.json", data.newData, () => {
            res.send(data.user);
        });
    }).catch(err => {
        res.sendStatus(400);
    });  
});

apiRouter.delete("/user/:id", (req, res) => {
    let id = req.params['id'];

    promise((resolve, reject) => {
        fs.readFile("src/users.json", "utf8", (err, data) => {
            if(err)
                reject(err);
    
            let users = JSON.parse(data);
            let index = users.findIndex(e => e.id == id);
    
            if(index > -1){
                let user = users.splice(index, 1)[0];
                let data = JSON.stringify(users);
                resolve({
                    users: data,
                    user: user
                })
            } else {
                reject();
            }
        });
    }).then(data => {
        fs.writeFile("src/users.json", data.users, () => {
            res.send(data.user);
        });
    }).catch(err => {
        res.sendStatus(404);
    });
});

apiRouter.put("/user", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
     
    let id = req.body.id;
    
    promise((resolve, reject) => {
        fs.readFile("src/users.json", "utf8", (err, data) => {
            if(err)
                reject(err);

            let users = JSON.parse(data);
            let user = users.find(e => e.id == id);

            if(user){
                user.age = req.body.age;
                user.name = req.body.name;
                let newData = JSON.stringify(users);
                resolve({
                    users: newData,
                    user: user
                });
            } else {
                reject();
            }
        });
    }).then(data => {
        fs.writeFile("src/users.json", data.users, () => {
            res.send(data.user);
        });
    }).catch(err => {
        res.sendStatus(400);
    });
});

server.use('/api', apiRouter);