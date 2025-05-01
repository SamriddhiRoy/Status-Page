const SavedFeed = require('../models/SavedFeed');
const User = require('../models/User');

const saveFeed = async (req, res) => {
  try {
    const { postId, title, url, source } = req.body;
    const userId = req.user.id;
    
    // Get the user's email from the database if not in token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const savedFeed = new SavedFeed({
      userId,
      postId,
      title,
      url,
      source,
      userEmail: user.email // Use the email from the user document
    });

    await savedFeed.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedFeeds: savedFeed._id } },
      { new: true }
    );

    res.status(201).json(savedFeed);
  } catch (error) {
    console.error('Error saving feed:', error);
    res.status(500).json({ 
      error: 'Failed to save feed',
      details: error.message 
    });
  }
};

module.exports = { saveFeed };