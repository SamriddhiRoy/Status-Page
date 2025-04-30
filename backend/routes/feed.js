const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveFeed } = require('../controllers/feedController'); // Import saveFeed

router.post('/save', auth, saveFeed); // Use the imported function
router.get('/saved', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.savedFeeds);
  } catch (error) {
    console.error('Error fetching saved feeds:', error);
    res.status(500).json({ error: 'Failed to fetch saved feeds' });
  }
});
module.exports = router;