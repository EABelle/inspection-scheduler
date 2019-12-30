
const mongoose = require('mongoose');

const { Schema } = mongoose;

const InspectionSchema = Schema({
  date: Date,
  inspectorId: Object,
  candidates: Array,
  owner: Object,
  vehicle: Object,
  inspection: Object,
  comments: String,
});

module.exports = mongoose.model('Inspection', InspectionSchema);
