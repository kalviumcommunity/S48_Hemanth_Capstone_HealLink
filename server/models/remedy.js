const mongoose = require("mongoose");

const remedySchema = new mongoose.Schema({
  disease: { type: String, required: true },
  remedies: [String],
  medicines: [
    {
      name: { type: String, required: true },
      instruction: { type: String, required: true },
    },
  ],
  youtubeLinks: [String],
});

module.exports = mongoose.model("Remedy", remedySchema);
