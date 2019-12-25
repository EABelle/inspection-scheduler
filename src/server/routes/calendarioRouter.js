
const express = require('express');
const CalendarioController = require('../controllers/calendarioController');

const api = express.Router();

const authMiddleware = require('../middlewares/auth');
const apiKeyMiddleware = require('../middlewares/apiKey');

api.get('', authMiddleware, CalendarioController.get);
api.get('/allAvailabilities', authMiddleware, CalendarioController.getByIgnoreAvailability);
api.get('/horarios', apiKeyMiddleware, CalendarioController.getDaysOnly);

module.exports = api;
