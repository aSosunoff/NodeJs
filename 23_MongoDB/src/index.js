const chalk = require('chalk');
const {MongoClient} = require('mongodb');
const getPromise = require('./getPromise');

const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

let user = {name: 'Alex', age: 25};
    
let users = [
    {name: 'Alex', age: 25},
    {name: 'Bill', age: 15},
    {name: 'Lina', age: 32},
    {name: 'Harry', age: 55},
    {name: 'Guidy', age: 55},
    {name: 'Peppi', age: 55},
    {name: 'Lina_2', age: 32},
];

const log = (text, result) => {
    console.log(chalk.black.bgWhite(text));
    if(result)
        console.log(result);
};

class Collection{
    constructor(db, collection){
        this.db = db;
        this.collection = collection;
    }

    drop(resolve, reject) {
        this.collection.findOne((err, result) => {
            if(err)
                reject(err);
            
            if(result){
                this.collection.drop((err, result) => {
                    if(err)
                        reject(err);
        
                    log('Удалили коллекцию', result);
    
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    insertOne(result){
        return getPromise((resolve, reject) => {
            this.collection.insertOne(user, (err, result) => {
                if(err)
                    reject(err);
    
                log('вставка одного пользователь', result.ops);
    
                resolve();
            });
        });
    }

    insertMany(result){
        return getPromise((resolve, reject) => {
            this.collection.insertMany(users, (err, result) => {
                if(err)
                    reject(err);
                
                log('вставка массива пользователей', result.ops);
                
                resolve();
            });
        });
    }

    find(result){
        return getPromise((resolve, reject) => {
            this.collection.find().toArray((err, result) => {
                if(err)
                    reject(err);
    
                log('чтение всех документов в коллекции', result);
                
                resolve();
            });
        });
    }

    findFilter(result){
        return getPromise((resolve, reject) => {
            this.collection.find({name: 'Alex'}).toArray((err, result) => {
                if(err)
                    reject(err);
        
                    log('чтение всех документов где имя пользователя Alex', result);
                
                resolve();
            });
        });
    }

    findOne(result){
        return getPromise((resolve, reject) => {
            this.collection.findOne((err, result) => {
                if(err)
                    reject(err);
                
                log('чтение первого документа', result);
                
                resolve();
            });
        });
    }

    deleteMany(result){
        return getPromise((resolve, reject) => {
            this.collection.deleteMany({age: 25}, function(err, result){
                if(err)
                    reject(err);
                
                log('Удаление всех пользователей кому есть 25', result.result);
                
                resolve();
            });
        });
    }

    deleteOne(result){
        return getPromise((resolve, reject) => {
            this.collection.deleteOne({age: 55}, function(err, result){
                if(err)
                    reject(err);
                
                log('Удаление одного пользователя кому 55', result.result);
                
                resolve();
            });
        });
    }

    findOneAndDelete(result){
        return getPromise((resolve, reject) => {
            this.collection.findOneAndDelete({age: 55}, function(err, result){
                if(err)
                    reject(err);
                
                log('Удаление одного пользователя кому 55, но с возвратом того кого удалили', result.value);
                
                resolve();
            });
        });
    }

    updateOne(result){
        return getPromise((resolve, reject) => {
            this.collection.updateOne({age: 32}, {$set: {name: "NEW_NAME", age: 666}}, (err, result) => {
                if(err)
                    reject(err);

                log('Изменение первого пользователя которому 32', result.result);
        
                resolve();
            });
        });
    }

    
}

mongoClient.connect(function(err, client){
    if(err)
        return console.log(err);

    const db = client.db('test');
    const collection = db.collection('users');

    const usersCollection = new Collection(db, collection);

    getPromise((resolve, reject) => { usersCollection.drop(resolve, reject); })
        .then(usersCollection.insertOne.bind(usersCollection))
        .then(usersCollection.insertMany.bind(usersCollection))
        .then(usersCollection.find.bind(usersCollection))
        .then(usersCollection.findFilter.bind(usersCollection))
        .then(usersCollection.findOne.bind(usersCollection))
        .then(usersCollection.deleteMany.bind(usersCollection))
        .then(usersCollection.deleteOne.bind(usersCollection))
        .then(usersCollection.findOneAndDelete.bind(usersCollection))
        .then(usersCollection.updateOne.bind(usersCollection))
        .catch(err => {
            console.log(err);
            client.reject();
        })
        .finally(() => {
            client.close();
        });
});