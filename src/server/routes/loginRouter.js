
const express = require('express');
const LoginController = require('../controllers/loginController');

const api = express.Router();

api.post('', LoginController.login);

module.exports = api;
