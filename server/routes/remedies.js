const express = require("express");
const Remedy = require("../models/remedy");
const { getAISuggestions } = require("../services/aiService");

const router = express.Router();

// GET remedy + AI suggestion
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();

    const remedy = await Remedy.findOne({ disease: name });

    if (!remedy) {
      return res.status(404).json({ message: "No data found for this disease" });
    }

    // AI suggestion (using disease as symptom input)
    const aiSuggestion = await getAISuggestions([name]);

    res.json({
      remedy,
      aiSuggestion,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD new remedy
router.post("/", async (req, res) => {
  const { disease, remedies, medicines, youtubeLinks } = req.body;

  try {
    const existing = await Remedy.findOne({ disease: disease.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Disease already exists" });
    }

    const remedy = new Remedy({
      disease: disease.toLowerCase(),
      remedies,
      medicines,
      youtubeLinks,
    });

    await remedy.save();
    res.status(201).json(remedy);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE remedy
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { disease, remedies, medicines, youtubeLinks } = req.body;

  try {
    const updated = await Remedy.findByIdAndUpdate(
      id,
      { disease, remedies, medicines, youtubeLinks },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Remedy not found" });
    }

    res.json({ message: "Remedy updated successfully", remedy: updated });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE remedy
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Remedy.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Remedy not found" });
    }

    res.json({ message: "Remedy deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;