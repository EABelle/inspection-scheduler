'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InspectorSchema = Schema({
    localidades: Array,
    nombre_apellido: String,
    provincia: String,
    horarios: Array,
    maximo: Number,
    habilitar: Array,
    inhabilitar: Array
});

module.exports = mongoose.model('Inspector', InspectorSchema);
