'use strict'

let express = require('express')
let CalendarioController = require('../controllers/calendarioController');

let api = express.Router();

let authMiddleware = require('../middlewares/auth')
let apiKeyMiddleware = require('../middlewares/apiKey')

api.get('', authMiddleware, CalendarioController.get);
api.get('/allAvailabilities', authMiddleware, CalendarioController.getByIgnoreAvailability);
api.get('/horarios', apiKeyMiddleware, CalendarioController.getDaysOnly);

module.exports = api;