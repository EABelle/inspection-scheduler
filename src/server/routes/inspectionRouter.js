
const express = require('express');
const InspectionController = require('../controllers/InspectionController');

const api = express.Router();

api.get('', InspectionController.get);
api.post('', InspectionController.post);
api.get('/:id', InspectionController.getInspection);
api.put('/:id', InspectionController.updateInspection);
api.delete('/:id', InspectionController.deleteInspection);

module.exports = api;
