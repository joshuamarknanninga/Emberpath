const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['field', 'public-domain', 'historical', 'community', 'indigenous-context'] },
    provenance: String,
    citation: String,
    caution: String
  },
  { _id: false }
);

const knowledgeEntrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'advanced'], default: 'easy' },
    timeRequired: { type: String, required: true },
    tools: [{ type: String }],
    tags: [{ type: String, index: true }],
    region: { type: String, default: 'general' },
    safetyNotes: [{ type: String }],
    source: sourceSchema,
    relatedEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeEntry' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('KnowledgeEntry', knowledgeEntrySchema);
