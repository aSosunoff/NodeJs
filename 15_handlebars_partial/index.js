const express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

const server = express();

server
    .use(express.static('css'))
    .use(express.static('js'))
    .set("view engine", "hbs")
    .engine("hbs", expressHbs(
        {
            layoutsDir: "views/layouts", 
            defaultLayout: "master",
            extname: "hbs"
        }
    ))
    .listen(3000);

hbs.registerPartials(__dirname + "/views/partials");

server.get("/", function(req, res){
    res.render("home.hbs", {
        title: 'Главная'
    });
});

server.get("/contact", function(req, res){
    res.render("contact.hbs", {
        title: 'Контакты',
        mainEmail: 'admin@mycorp.com',
        otherEmail: [
            "test_1@mycorp.com", 
            "test_2@mycorp.com",
            "test_3@mycorp.com",
        ]
    });
});