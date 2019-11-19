'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InspeccionSchema = Schema({
    fecha: Date,
    inspector_id: Object,
    candidatos: Array,
    titular: Object,
    vehiculo: Object,
    inspeccion: Object,
    observaciones: String
});

module.exports = mongoose.model('Inspeccion', InspeccionSchema);
