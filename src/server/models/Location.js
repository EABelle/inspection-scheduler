
const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = Schema({
  nombre: String,
  cp: String,
});

module.exports = mongoose.model('Location', LocationSchema);
