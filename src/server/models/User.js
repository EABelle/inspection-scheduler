
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
