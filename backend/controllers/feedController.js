const SavedFeed = require('../models/SavedFeed');
const User = require('../models/User');

const saveFeed = async (req, res) => {
  try {
    const { postId, title, url, source } = req.body;
    const userId = req.user.id;

    // Check if feed already exists first
    const existingFeed = await SavedFeed.findOne({ userId, postId });
    if (existingFeed) {
      return res.status(200).json({ 
        message: 'Feed already saved',
        feed: existingFeed 
      });
    }

    // Get current user with credits
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create and save new feed
    const savedFeed = new SavedFeed({
      userId,
      postId,
      title,
      url,
      source,
      userEmail: user.email
    });
    await savedFeed.save();

    // Update user with new feed and increment credits
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { savedFeeds: savedFeed._id },
        $inc: { credits: 5 } // This increments credits by 5
      },
      { new: true }
    );

    res.status(201).json({
      message: 'Feed saved successfully! +5 credits',
      feed: savedFeed,
      newCredits: updatedUser.credits
    });

  } catch (error) {
    console.error('Error saving feed:', error);
    res.status(500).json({ 
      error: 'Failed to save feed',
      details: error.message 
    });
  }
};

module.exports = { saveFeed };