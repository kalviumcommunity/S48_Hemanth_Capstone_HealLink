const mongoose = require('mongoose');

const remedySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
});

const Remedy = mongoose.model('Remedy', remedySchema);
module.exports = Remedy;
