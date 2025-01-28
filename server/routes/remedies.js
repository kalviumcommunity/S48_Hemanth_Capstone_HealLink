const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const remediesFilePath = path.join(__dirname, '../data/remedies.json');

const updateRemediesFile = (remedies) => {
    fs.writeFileSync(remediesFilePath, JSON.stringify(remedies, null, 2));
};

let remedies = require('../data/remedies.json');

router.get('/', (req, res) => {
    res.json(remedies);
});

router.post('/', (req, res) => {
    const { name, description, instructions } = req.body;

    if (!name || !description || !instructions) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newRemedy = {
        id: remedies.length + 1,
        name,
        description,
        instructions
    };

    remedies.push(newRemedy);
    updateRemediesFile(remedies);

    res.status(201).json(newRemedy);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, instructions } = req.body;

    const remedyIndex = remedies.findIndex(remedy => remedy.id === parseInt(id));

    if (remedyIndex === -1) {
        return res.status(404).json({ message: "Remedy not found" });
    }

    if (!name || !description || !instructions) {
        return res.status(400).json({ message: "All fields are required for update" });
    }

    remedies[remedyIndex] = { id: parseInt(id), name, description, instructions };
    updateRemediesFile(remedies);

    res.json({ message: "Remedy updated successfully", remedy: remedies[remedyIndex] });
});

module.exports = router;
