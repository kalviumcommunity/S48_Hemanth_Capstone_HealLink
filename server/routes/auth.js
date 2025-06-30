const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashed });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get User Profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email');
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

// Edit Username
router.put('/edit', auth, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ msg: "All fields are required" });

  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

    user.username = username;
    await user.save();
    res.json({ msg: "Username updated successfully" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

// Change Password
router.put('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword)
    return res.status(400).json({ msg: "All fields are required" });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Incorrect current password" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ msg: "Password changed successfully" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
