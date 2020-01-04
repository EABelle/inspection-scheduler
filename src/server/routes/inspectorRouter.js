
const express = require('express');
const InspectorController = require('../controllers/InspectorController');

const api = express.Router();

api
    .get('', InspectorController.get)
    .post('', InspectorController.createInspector)
    .get('/:id', InspectorController.getInspector)
    .put('/:id', InspectorController.updateInspector)
    .delete('/:id', InspectorController.deleteInspector)
    .post('/:id/availableDate', InspectorController.addAvailableDate)
    .post('/:id/unavailableDate', InspectorController.addUnavailableDate)
    .delete('/:id/customDate/:date', InspectorController.deleteCustomDate);


module.exports = api;
