const express = require('express');

const server = express();

server.set("view engine", "hbs");

server.get("/", function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(`<h1>Главная</h1>`);
    res.write('<a href="/contact">Контакты</a>');
    res.end();
});

server.get("/contact", function(req, res){
    res.render("contact.hbs", {
        mainEmail: 'admin@mycorp.com',
        otherEmail: [
            "test_1@mycorp.com", 
            "test_2@mycorp.com",
            "test_3@mycorp.com",
        ]
    });
});

server.listen(3000);