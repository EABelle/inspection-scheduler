
const mongoose = require('mongoose');

const { Schema } = mongoose;

const InspectorSchema = Schema({
  locations: Array,
  fullName: String,
  workingArea: String,
  times: Array,
  maximumPerDay: Number,
  daysUnlimited: Array,
  daysNotAble: Array,
});

module.exports = mongoose.model('Inspector', InspectorSchema);
