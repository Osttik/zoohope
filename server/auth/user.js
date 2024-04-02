const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  });
module.exports = User;