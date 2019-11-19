'use strict'

let express = require('express')
let AgendaController = require('../controllers/agendaController');

let api = express.Router();

api.post('', AgendaController.agendar);

module.exports = api;