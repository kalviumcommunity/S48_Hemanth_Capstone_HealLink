const express = require('express');
const router = express.Router();
const Remedy = require('../models/remedy');

router.get('/', async (req, res) => {
    try {
        const remedies = await Remedy.find();
        res.json(remedies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, description, instructions } = req.body;

    if (!name || !description || !instructions) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newRemedy = new Remedy({ name, description, instructions });
        await newRemedy.save();
        res.status(201).json(newRemedy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, instructions } = req.body;

    try {
        const updatedRemedy = await Remedy.findByIdAndUpdate(
            id,
            { name, description, instructions },
            { new: true, runValidators: true }
        );

        if (!updatedRemedy) {
            return res.status(404).json({ message: "Remedy not found" });
        }

        res.json({ message: "Remedy updated successfully", remedy: updatedRemedy });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
