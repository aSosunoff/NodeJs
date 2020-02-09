import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import expressHbs from 'express-handlebars';
import hbs from 'hbs';

import homeRouter from './routes/homeRouter';
import userRouter from './routes/userRouter';
import userRouterApi from './routes/userRouterApi';

const server = express();

interface HelperSection{
    _sections: any;
}

const exphbs = expressHbs.create({
    layoutsDir: "app/views/layouts", 
    defaultLayout: "master",
    extname: "hbs",
    helpers: {
        section: function(this: HelperSection, name: any, options: any) { 
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
        .use(bodyParser.json())
        .use(express.static(path.resolve(__dirname, 'scripts')))
        .use(express.static(path.resolve(__dirname, 'style')))
        .set("view engine", "hbs")
        .engine('hbs', exphbs.engine)
        .set("views", path.resolve(__dirname, 'views'))
        .use('/', homeRouter)
        .use('/user', userRouter)
        .use('/api/user', userRouterApi)
        .listen(3000, () => {
            console.log('Server is started');
        });
});