'use strict'

let express = require('express')
let LoginController = require('../controllers/loginController');

let api = express.Router();

api.post('', LoginController.login);

module.exports = api;