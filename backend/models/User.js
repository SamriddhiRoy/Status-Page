const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  credits: { type: Number, default: 0 },
  lastLogin: Date,
  profileCompleted: { type: Boolean, default: false },
  savedFeeds: [Object],
});

module.exports = mongoose.model('User', userSchema);
