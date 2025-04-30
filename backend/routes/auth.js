const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  register,
  login,
  completeProfile,
  getMe
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/complete-profile', auth, completeProfile);
router.get('/me', auth, getMe);

module.exports = router;
