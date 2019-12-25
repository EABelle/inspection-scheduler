
const express = require('express');
const LocationController = require('../controllers/LocationController');

const api = express.Router();

api.get('', LocationController.get);

module.exports = api;
