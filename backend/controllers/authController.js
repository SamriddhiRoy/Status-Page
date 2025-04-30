const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.json({ token: generateToken(user), user });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });

    // Reward daily login credits
    const today = new Date().toDateString();
    const lastLogin = user.lastLogin?.toDateString();
    if (today !== lastLogin) {
      user.credits += 10; // 10 credits for daily login
      user.lastLogin = new Date();
      await user.save();
    }

    res.json({ token: generateToken(user), user });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.completeProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.profileCompleted) {
    user.profileCompleted = true;
    user.credits += 20; // 20 credits for profile completion
    await user.save();
  }
  res.json({ message: "Profile marked complete", credits: user.credits });
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
