const path = require('path');
const UserModel = require('../models/userModel');

exports.list = (req, res) => {
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
}

exports.getUserById = (req, res) => {
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
}

exports.save = (req, res) => {
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
};

exports.delete = (req, res) => {
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
};

exports.update = (req, res) => {
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
};