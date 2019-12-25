
const express = require('express');
const InspectorController = require('../controllers/inspectorController');

const api = express.Router();

api.get('', InspectorController.get);
api.post('', InspectorController.post);
api.get('/:id', InspectorController.getInspector);
api.put('/:id', InspectorController.updateInspector);
api.delete('/:id', InspectorController.deleteInspector);

module.exports = api;
