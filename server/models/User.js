const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    savedEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeEntry' }],
    offlinePacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OfflinePack' }],
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    points: { type: Number, default: 0 },
    bio: { type: String, default: '' },
    location: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
