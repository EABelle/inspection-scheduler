
const express = require('express');
const LocalidadController = require('../controllers/localidadController');

const api = express.Router();

api.get('', LocalidadController.get);

module.exports = api;
