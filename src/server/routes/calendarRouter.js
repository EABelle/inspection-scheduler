
const express = require('express');
const CalendarController = require('../controllers/CalendarController');

const api = express.Router();

const authMiddleware = require('../middlewares/auth');
const apiKeyMiddleware = require('../middlewares/apiKey');

api.get('', authMiddleware, CalendarController.get);
api.get('/allAvailabilities', authMiddleware, CalendarController.getByIgnoreAvailability);
api.get('/horarios', apiKeyMiddleware, CalendarController.getDaysOnly);

module.exports = api;
