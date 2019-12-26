
const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = Schema({
  name: String,
  zipCode: String,
});

module.exports = mongoose.model('Location', LocationSchema);
