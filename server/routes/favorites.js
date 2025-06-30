const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites.slice(-4).reverse());
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites.reverse());
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  const { disease } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (user.favorites.some((fav) => fav.disease === disease)) {
      return res.status(400).json({ msg: "Already added" });
    }

    user.favorites.push({ disease });
    await user.save();
    res.json({ msg: "Added to favorites" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:disease", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter((f) => f.disease !== req.params.disease);
    await user.save();
    res.json({ msg: "Removed from favorites" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
