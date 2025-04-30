const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Authorization Header:", authHeader); // Log the entire header

  const token = authHeader?.replace('Bearer ', '');
  console.log("Extracted Token:", token); // Log the extracted token

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the decoded payload
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err); // Log the verification error
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;