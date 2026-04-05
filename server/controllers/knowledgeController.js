const KnowledgeEntry = require('../models/KnowledgeEntry');
const KnowledgeRelation = require('../models/KnowledgeRelation');
const User = require('../models/User');

const listEntries = async (req, res) => {
  const { q, difficulty, tag, region } = req.query;
  const filter = {};
  if (difficulty) filter.difficulty = difficulty;
  if (tag) filter.tags = tag;
  if (region) filter.region = region;
  if (q) {
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { summary: new RegExp(q, 'i') },
      { tags: new RegExp(q, 'i') }
    ];
  }

  const entries = await KnowledgeEntry.find(filter).sort({ createdAt: -1 }).limit(100);
  res.json(entries);
};

const getEntry = async (req, res) => {
  const entry = await KnowledgeEntry.findById(req.params.id).populate('relatedEntries', 'title summary tags');
  if (!entry) return res.status(404).json({ message: 'Entry not found' });

  const relatedByTag = await KnowledgeEntry.find({
    _id: { $ne: entry._id },
    tags: { $in: entry.tags }
  })
    .limit(4)
    .select('title summary tags');

  const explicitRelations = await KnowledgeRelation.find({ fromEntry: entry._id })
    .populate('toEntry', 'title summary tags')
    .limit(4);

  res.json({
    ...entry.toObject(),
    crossReferences: {
      relatedByTag,
      explicit: explicitRelations
    }
  });
};

const saveEntry = async (req, res) => {
  const user = await User.findById(req.userId);
  const entryId = req.params.id;

  if (!user.savedEntries.map(String).includes(entryId)) {
    user.savedEntries.push(entryId);
    await user.save();
  }

  res.json({ message: 'Entry saved', savedEntries: user.savedEntries });
};

module.exports = { listEntries, getEntry, saveEntry };
