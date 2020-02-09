import express from 'express';
import userControllerAPI from '../api/userControllerAPI';

const userRouterApi = express.Router();
userRouterApi.get('/', userControllerAPI.list);
userRouterApi.get('/:id', userControllerAPI.getUserById);
userRouterApi.post('/', userControllerAPI.save);
userRouterApi.delete('/:id', userControllerAPI.delete);
userRouterApi.put('/', userControllerAPI.update);

export default userRouterApi;