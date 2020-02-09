import { Request, Response } from 'express';

export default {
    index(req: Request, res: Response) {
        res.render('user/index.hbs', {
            title: 'Список пользователей',
            isUser: true
        });
    }
}