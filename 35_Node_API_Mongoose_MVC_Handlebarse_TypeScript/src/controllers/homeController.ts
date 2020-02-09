import { Request, Response } from 'express';

export default {
    index(req: Request, res: Response) {
        res.render('home/index.hbs', {
            title: 'Главная страница',
            isHome: true
        });
    },

    about(req: Request, res: Response) {
        res.render('home/about.hbs', {
            title: 'О сайте',
            isAbout: true
        });
    }
}