'use strict'

let express = require('express')
let LocalidadController = require('../controllers/localidadController');

let api = express.Router();

api.get('', LocalidadController.get);

module.exports = api;