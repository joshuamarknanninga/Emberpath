const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    pointsAwarded: { type: Number, default: 10 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Badge', badgeSchema);
