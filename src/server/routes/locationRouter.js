
const express = require('express');
const LocalidadController = require('../controllers/LocationController');

const api = express.Router();

api.get('', LocalidadController.get);

module.exports = api;
