const mongoose = require('mongoose');

const offlinePackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    entryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeEntry' }],
    includeMapReports: { type: Boolean, default: true },
    format: { type: String, enum: ['json', 'html'], default: 'json' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('OfflinePack', offlinePackSchema);
