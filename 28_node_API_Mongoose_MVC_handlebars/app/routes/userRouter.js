const express = require('express');
const userController = require('../controllers/userController');

const userRouterWeb = express.Router();
userRouterWeb.get('/', userController.index);

module.exports = userRouterWeb;