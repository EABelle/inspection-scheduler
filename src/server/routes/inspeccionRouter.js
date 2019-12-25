
const express = require('express');
const InspeccionController = require('../controllers/inspeccionController');

const api = express.Router();

api.get('', InspeccionController.get);
api.post('', InspeccionController.post);
api.get('/:id', InspeccionController.getInspeccion);
api.put('/:id', InspeccionController.updateInspeccion);
api.delete('/:id', InspeccionController.deleteInspeccion);

module.exports = api;
