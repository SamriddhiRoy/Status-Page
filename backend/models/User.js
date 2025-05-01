const mongoose = require('mongoose');

// Define FeedSchema first if you need it
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
  savedFeeds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SavedFeed',
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid ObjectId!`
    }
  }]
}, { timestamps: true });

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;