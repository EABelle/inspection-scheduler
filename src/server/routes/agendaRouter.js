
const express = require('express');
const AgendaController = require('../controllers/AgendaController');

const api = express.Router();

api.post('', AgendaController.schedule);

module.exports = api;
