const mongoose = require('mongoose');

 const FeedSchema = new mongoose.Schema({
   postId: String,
   title: String,
   url: String,
   source: String,
 });

 const UserSchema = new mongoose.Schema({
   name: String,
   email: { type: String, unique: true },
   password: String,
   role: { type: String, default: 'User' },
   credits: { type: Number, default: 0 },
   profileCompleted: { type: Boolean, default: false },
   lastLogin: Date,
   savedFeeds: [FeedSchema],
 });

 module.exports = mongoose.model('User', UserSchema);
