const express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

const server = express();

const exphbs = expressHbs.create({
    layoutsDir: "views/layouts", 
    defaultLayout: "master",
    extname: "hbs",
    helpers: {
        getTime: () => {
            var myDate = new Date();
            var hour = myDate.getHours();
            var minute = myDate.getMinutes();
            var second = myDate.getSeconds();
        
            if (minute < 10) 
                minute = "0" + minute;
        
            if (second < 10) 
                second = "0" + second;
        
            return "Текущее время: " + hour + ":" + minute + ":" + second;
        },
        say: () => {
            return 'Привет для всех шаблонов'
        },
        getList: (arr) => {
            if(!arr.length) 
                return '';
                
            let result = '<ul>';
            
            for(let value of arr)
                result += `<li>${value}</li>`;

            result += '</ul>';

            return result;
        }
    }
});

hbs.registerPartials(__dirname + "/views/partials");

server
    .use(express.static('css'))
    .use(express.static('js'))
    .set("view engine", "hbs")
    .engine('hbs', exphbs.engine)
    .listen(3000);

server.get("/", function(req, res){
    res.render("home.hbs", {
        title: 'Главная',
        helpers: {
            say: function(){ return 'Привет с главной страницы'; }
        }
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