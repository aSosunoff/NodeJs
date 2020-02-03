const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');
//const expressHbs = require("express-handlebars");
//const hbs = require("hbs");

const server = express();

// const exphbs = expressHbs.create({
//     layoutsDir: "views/layouts", 
//     defaultLayout: "master",
//     extname: "hbs",
//     helpers: {

//     }
// });


server
    .use(express.static('css'))
    .use(express.static('js'))
    .set("view engine", "ejs")
    .use(expressEjsLayout)
    .listen(3000);

server.set('layout', 'layout/master.ejs');

server.locals.say = () => {
    return 'Привет для всех шаблонов'
};

server.locals.getTime = () => {
    var myDate = new Date();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();

    if (minute < 10) 
        minute = "0" + minute;

    if (second < 10) 
        second = "0" + second;

    return "Текущее время: " + hour + ":" + minute + ":" + second;
};

server.locals.getList = (arr) => {
    if(!arr.length) 
        return '';
        
    let result = '<ul>';
    
    for(let value of arr)
        result += `<li>${value}</li>`;

    result += '</ul>';

    return result;
};

server.get("/", function(req, res){
    res.render("home", {
        title: 'Главная',
        say: function(){ return 'Привет с главной страницы'; }
    });
});

server.get("/contact", function(req, res){
    res.render("contact", {
        title: 'Контакты',
        mainEmail: 'admin@mycorp.com',
        otherEmail: [
            "test_1@mycorp.com", 
            "test_2@mycorp.com",
            "test_3@mycorp.com",
        ]
    });
});