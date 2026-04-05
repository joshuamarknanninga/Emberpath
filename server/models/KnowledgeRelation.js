const mongoose = require('mongoose');

const knowledgeRelationSchema = new mongoose.Schema(
  {
    fromEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeEntry', required: true },
    toEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeEntry', required: true },
    strength: { type: Number, min: 0, max: 1, default: 0.5 },
    reason: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('KnowledgeRelation', knowledgeRelationSchema);
