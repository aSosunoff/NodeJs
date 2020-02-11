const fs = require('fs');
const {MongoClient} = require('mongodb');

const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

const handler = (req, res) => {
    // throw new Error('Ошибка для демонстрации. Эту ошибку поймает domain');
    switch(req.url){
        case '/': 
            fs.readFile('./index.html', 'utf8', (err, data) => {
                if(err) throw new Error('Файла нет. Эту ошибку поймает domain');

                res.end(data);
            });
            break;
        case '/e':
            // файла не существует
            fs.readFile('./error.html', 'utf8', (err, data) => {
                if(err) throw new Error('Файла нет. Эту ошибку поймает domain');

                res.end(data);
            });
            break;
        case '/db': 
            mongoClient.connect(function(err, client){
                const db = client.db('test');
                const collection = db.collection('users');
            
                collection.find().toArray((err, data) => {
                    client.close();
                    throw new Error('Ошибка в бд');
                });
            });
            break;
        default:
            res.statusCode = 404;
            res.end('Not found');
    }
};

module.exports = handler;