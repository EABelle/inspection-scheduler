'use strict'

let express = require('express')
let InspeccionController = require('../controllers/inspeccionController');

let api = express.Router();

api.get('', InspeccionController.get);
api.post('', InspeccionController.post);
api.get('/:id', InspeccionController.getInspeccion);
api.put('/:id', InspeccionController.updateInspeccion);
api.delete('/:id', InspeccionController.deleteInspeccion);

module.exports = api;