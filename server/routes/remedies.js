const express = require('express');
const router = express.Router();
const remedies = require('../data/remedies.json');

router.get('/', (req, res) => {
    res.json(remedies);
});

module.exports = router;
