const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const server = express();
const apiRouter = express.Router();
let jsonParser = bodyParser.json();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "guest"
    },
    age: {
        type: Number,
        min: 18
    }
});
const UserModel = mongoose.model("User", userSchema);

mongoose.connect('mongodb://localhost:27017/27_node_API_Mongoose', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, err => {
    if(err) return console.log(err);

    server
        .use(express.static(path.resolve(__dirname, '../public')))
        .listen(3000, () => {
            console.log('Server is started...');
        });
});

apiRouter.get('/users', (req, res) => {
    try {
        UserModel.find((err, docs) => {
            if(err) {
                console.log(err);
                return res.status(400).send('Ошибка при загрузке пользователей');;
            }

            res.send(docs);
        });
    } catch(err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

apiRouter.get('/user/:id', (req, res) => {
    try {
        let id = req.params['id'];

        UserModel.findById(id, (err, doc) => {
            if(err) {
                console.log(err);
                return res.status(400).send('Ошибка загрузки пользователя');
            }
    
            res.send(doc);
        });
    } catch(err){
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

apiRouter.post('/user', jsonParser, (req, res) => {
    try {
        if(!req.body)
            throw new Error('Parameter is not found');

        UserModel.create({
            name: req.body.name, 
            age: req.body.age,
            erer: 1
        })
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err.message);
        });
    } catch(err){
        console.log(err.message);
        res.status(404).send(err.message);
    }    
});

apiRouter.delete("/user/:id", (req, res) => {
    try {
        let id = req.params['id'];

        UserModel.findByIdAndDelete(id, (err, doc) => {
            if(err) {
                console.log(err);
                return res.status(400).send('Ошибка удаления пользователя');
            }

            res.send(doc);
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).send(err.message);
    }
});

apiRouter.put("/user", jsonParser, function(req, res){
    try {
        if(!req.body)
            throw new Error('Parameter is not found');

        let id = req.body.id;

        UserModel.findOneAndUpdate({_id: id}, {
            age: req.body.age,
            name: req.body.name
        },
        {new: true},
        (err, doc, resss) => {
            if(err) {
                console.log(err);
                return res.status(400).send('Ошибка обновления пользователя');
            }

            res.send(doc);
        });
    } catch(err){
        console.log(err.message);
        res.status(404).send(err.message);
    }   
});

server.use('/api', apiRouter);

process.on('SIGINT', () => {
    mongoose.disconnect();
    process.exit();
});