
const mongoose = require('mongoose');

const { Schema } = mongoose;

const InspeccionSchema = Schema({
  fecha: Date,
  inspector_id: Object,
  candidatos: Array,
  titular: Object,
  vehiculo: Object,
  inspeccion: Object,
  observaciones: String,
});

module.exports = mongoose.model('Inspeccion', InspeccionSchema);
