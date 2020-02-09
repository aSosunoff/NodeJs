import express from 'express';
import homeController from '../controllers/homeController';

const homeRouter = express.Router();
homeRouter.get('/', homeController.index);
homeRouter.get('/about', homeController.about);

export default homeRouter;