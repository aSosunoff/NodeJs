const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {MongoClient, ObjectID} = require('mongodb');

const server = express();
const apiRouter = express.Router();
let jsonParser = bodyParser.json();
const mongoClient = new MongoClient('mongodb://localhost:27017',  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

let dbClient = null;

mongoClient.connect((err, client) => {
    if(err) return console.log(err);

    dbClient = client;

    server.locals.userCollection = client.db('24_node_API_MongoDB').collection('users');

    server
        .use(express.static(path.resolve(__dirname, '../public')))
        .listen(3000, () => {
            console.log('Server is started...');
        });
});

apiRouter.get('/users', (req, res) => {
    try {
        req.app.locals.userCollection.find().toArray((err, users) => {
            if(err) {
                console.log(err);
                return res.sendStatus(400);
            }
    
            res.send(users);
        });
    } catch(err) {
        console.log(err.message);
        res.sendStatus(404);
    }
});

apiRouter.get('/user/:id', (req, res) => {
    try {
        let id = ObjectID(req.params['id']);

        req.app.locals.userCollection.findOne({_id: id}, (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(400);
            }
    
            res.send(result);
        }); 
    } catch(err){
        console.log(err.message);
        res.sendStatus(404);
    }
});

apiRouter.post('/user', jsonParser, (req, res) => {
    try {
        if(!req.body)
            throw new Error('Parameter is not found');

        let user = {
            name: req.body.name, 
            age: req.body.age
        };

        req.app.locals.userCollection.insertOne(user, (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(400);
            }

            res.send(user);
        });
    } catch(err){
        console.log(err.message);
        res.sendStatus(404);
    }    
});

apiRouter.delete("/user/:id", (req, res) => {
    try {
        let id = ObjectID(req.params['id']);

        req.app.locals.userCollection.findOneAndDelete({_id: id}, (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(400);
            }
    
            res.send(result.value);
        });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(404);
    }
});

apiRouter.put("/user", jsonParser, function(req, res){
    try {
        if(!req.body)
            throw new Error('Parameter is not found');

        let id = ObjectID(req.body.id);

        req.app.locals.userCollection.findOneAndUpdate(
            {_id: id},
            {$set: {
                age: req.body.age,
                name: req.body.name
            }},
            {returnOriginal: false},
            (err, result) => {
                if(err) {
                    console.log(err);
                    return res.sendStatus(400);
                }
    
                res.send(result.value);
            });
    } catch(err){
        console.log(err.message);
        res.sendStatus(404);
    }   
});

server.use('/api', apiRouter);

process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
});