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

module.exports = router;
