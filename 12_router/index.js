const express = require('express');
const path = require('path');
const fs = require('fs');

const server = express();
const productRouter = express.Router();

function GetProduct(callback){
    fs.readFile(path.resolve(__dirname, 'products.json'), (err, data) => {
        if(err){
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
}

server.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(`<h1>Главная</h1>`);
    res.write('<a href="/product">Продукты</a>');
    res.end();
});

productRouter.get('/', (req, res) => {
    GetProduct((err, products) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<a href="/">назад</a>');
        res.write(`<h1>Продукты</h1>`);

        if(err){
            res.write('<span>Продуктов нет</span>');
        } else {
            res.write('<ul>');
            for(let o of products)
                res.write(`<li><a href="/product/${o.id}">${o.title}</a></li>`);
            res.write('</ul>');
            res.write('<a href="/product/create">Создать продукт</a>');
        }

        res.end();
    });
});

productRouter.get('/create', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<a href="/product">назад</a>');
    res.write(`<h1>Создание продукта</h1>`);
    res.end();
});

productRouter.get('/:id', (req, res) => {
    let id = Number(req.params['id']);
    GetProduct((err, products) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<a href="/product">назад</a>');
        res.write(`<h1>Продукт</h1>`);

        if(err){
            res.write('<span>Выбранный продукт отсутствует</span>');
        } else {
            let product = products.find(e => e.id === id);
            if(!product){
                res.write('<span>Выбранный продукт отсутствует</span>');
            } else {
                res.write('<ul>');
                res.write(`<li>${product.id}</li>`);
                res.write(`<li>${product.title}</li>`);
                res.write(`<li>${product.description}</li>`);
                res.write(`<li>${product.price}</li>`);
                res.write(`<li>${product.img}</li>`);
                res.write(`<li>${product.availableInvectory}</li>`);
                res.write(`<li>${product.rating}</li>`);
                res.write('</ul>');
            }            
        }

        res.end();
    });
});

server.use('/product', productRouter);

server.listen(3000, () => {
    console.log('Server is started');
});