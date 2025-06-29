const mongoose = require("mongoose");

const remedySchema = new mongoose.Schema({
  disease: { type: String, required: true, unique: true },
  remedies: [String],
  medicines: [String],
  youtubeLinks: [String]
});

module.exports = mongoose.model("Remedy", remedySchema);
