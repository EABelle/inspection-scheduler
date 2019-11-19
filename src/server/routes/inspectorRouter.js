'use strict'

let express = require('express')
let InspectorController = require('../controllers/inspectorController');

let api = express.Router();

api.get('', InspectorController.get);
api.post('', InspectorController.post);
api.get('/:id', InspectorController.getInspector);
api.put('/:id', InspectorController.updateInspector);
api.delete('/:id', InspectorController.deleteInspector);

module.exports = api;