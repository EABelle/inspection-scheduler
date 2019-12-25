
const mongoose = require('mongoose');

const { Schema } = mongoose;

const InspectorSchema = Schema({
  locations: Array,
  nombre_apellido: String,
  provincia: String,
  horarios: Array,
  maximo: Number,
  habilitar: Array,
  inhabilitar: Array,
});

module.exports = mongoose.model('Inspector', InspectorSchema);
