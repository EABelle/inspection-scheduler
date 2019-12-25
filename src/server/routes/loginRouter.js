
const express = require('express');
const LoginController = require('../controllers/LoginController');

const api = express.Router();

api.post('', LoginController.login);

module.exports = api;
