
const express = require('express');
const AgendaController = require('../controllers/agendaController');

const api = express.Router();

api.post('', AgendaController.agendar);

module.exports = api;
