import express from 'express';
import userController from '../controllers/userController';

const userRouterWeb = express.Router();
userRouterWeb.get('/', userController.index);

export default userRouterWeb;