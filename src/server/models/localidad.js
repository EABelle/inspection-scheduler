'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalidadSchema = Schema({
    nombre: String,
    cp: String
});

module.exports = mongoose.model('Localidad', LocalidadSchema);
