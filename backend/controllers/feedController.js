// backend/controllers/feedController.js
const User = require('../models/User');

const saveFeed = async (req, res) => {
  const { postId, title, url, source } = req.body;

  console.log("Saving feed with postId:", postId); // Add logging here

  try {
    const user = await User.findById(req.user.id);

    // Log current saved feeds
    console.log("Current saved feeds:", user.savedFeeds);

    const alreadySaved = user.savedFeeds.find(f => f.postId === postId);
    if (alreadySaved) return res.status(400).json({ error: "Already saved" });

    // Push the feed to savedFeeds array
    user.savedFeeds.push({ postId, title, url, source });

    // Reward credits for saving a feed
    user.credits += 5;
    await user.save();

    console.log("Feed saved successfully! Updated credits:", user.credits); // Add logging here

    res.json({ message: "Feed saved", credits: user.credits });
  } catch (err) {
    console.log("Error saving feed:", err); // Add error logging
    res.status(500).json({ error: "Failed to save feed" });
  }
};

module.exports = { saveFeed };