const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Update user profile route
router.put('/update', auth, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userId = req.user.id;
  
      // Get current user data
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updates = {
        $set: {},
        $inc: { credits: 2 } // Award 2 credits for profile update
      };
  
      if (name) updates.$set.name = name;
      if (email) updates.$set.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updates.$set.password = await bcrypt.hash(password, salt);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: true, runValidators: true }
      ).select('-password');
  
      res.json({ 
        message: 'Profile updated successfully! +2 credits',
        user: updatedUser,
        creditsAdded: 2,
        newCredits: updatedUser.credits
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ 
        message: 'Error updating profile',
        error: error.message 
      });
    }
});

module.exports = router;