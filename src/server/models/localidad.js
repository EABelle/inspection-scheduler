
const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocalidadSchema = Schema({
  nombre: String,
  cp: String,
});

module.exports = mongoose.model('Localidad', LocalidadSchema);
