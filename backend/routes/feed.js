const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveFeed } = require('../controllers/feedController');
const User = require('../models/User'); // Add this import
const SavedFeed = require('../models/SavedFeed'); // Add this import

router.post('/save', auth, saveFeed);

router.get('/saved', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedFeeds',
        options: { sort: { createdAt: -1 } }
      })
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.savedFeeds || []);
  } catch (error) {
    console.error('Error fetching saved feeds:', error);
    res.status(500).json({ error: 'Failed to fetch saved feeds' });
  }
});

router.get('/debug/all-saved-feeds', async (req, res) => {
  try {
    const allFeeds = await SavedFeed.find().populate('userId', 'email _id');
    res.json(allFeeds);
  } catch (error) {
    console.error('Error fetching all saved feeds:', error);
    res.status(500).json({ error: 'Server error while fetching feeds' });
  }
});

module.exports = router;