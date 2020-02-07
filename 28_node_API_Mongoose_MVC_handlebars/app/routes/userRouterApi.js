const express = require('express');
const userControllerAPI = require('../api/userControllerAPI');

const userRouterApi = express.Router();
userRouterApi.get('/', userControllerAPI.list);
userRouterApi.get('/:id', userControllerAPI.getUserById);
userRouterApi.post('/', userControllerAPI.save);
userRouterApi.delete('/:id', userControllerAPI.delete);
userRouterApi.put('/', userControllerAPI.update);

module.exports = userRouterApi;