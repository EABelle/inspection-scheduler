
const mongoose = require('mongoose');

const { Schema } = mongoose;

const InspectionSchema = Schema({
  fecha: Date,
  inspector_id: Object,
  candidates: Array,
  titular: Object,
  vehiculo: Object,
  inspection: Object,
  observaciones: String,
});

module.exports = mongoose.model('Inspection', InspectionSchema);
