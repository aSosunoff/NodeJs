const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

const server = express();

const exphbs = expressHbs.create({
    layoutsDir: "app/views/layouts", 
    defaultLayout: "master",
    extname: "hbs",
    helpers: {
        section: function(name, options) { 
            if (!this._sections) 
                this._sections = {};
                
            this._sections[name] = options.fn(this); 
            return null;
        },
    }
});
hbs.registerPartials(path.resolve(__dirname, "views/partials"));

mongoose.connect('mongodb://localhost:27017/28_node_API_Mongoose_MVC', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, err => {
    if(err) return console.log(err);

    server
        // parse application/x-www-form-urlencoded
        // .use(bodyParser.urlencoded({ extended: false }))
        // parse application/json
        .use(bodyParser.json())
        .use(express.static(path.resolve(__dirname, 'scripts')))
        .use(express.static(path.resolve(__dirname, 'style')))
        .set("view engine", "hbs")
        .engine('hbs', exphbs.engine)
        .set("views", path.resolve(__dirname, 'views'))
        .use('/', require('./routes/homeRouter'))
        .use('/user', require('./routes/userRouter'))
        .use('/api/user', require('./routes/userRouterApi'))
        .listen(3000, () => {
            console.log('Server is started...');
        });
});

process.on('SIGINT', () => {
    mongoose.disconnect();
    process.exit();
});