const KnowledgeEntry = require('../models/KnowledgeEntry');

const buildSystemPrompt = () => ({
  principles: [
    'Prioritize immediate safety and legal/ethical behavior.',
    'State uncertainty clearly when context is missing.',
    'Avoid medical certainty and advise professional help for severe risk.',
    'Only reference known internal knowledge entries when possible.',
    'Respect indigenous knowledge boundaries; include provenance and caution.'
  ]
});

const findRelatedEntries = async (question) => {
  const terms = question
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 2)
    .slice(0, 8);

  if (!terms.length) return [];

  return KnowledgeEntry.find({
    $or: [{ tags: { $in: terms } }, { title: new RegExp(terms.join('|'), 'i') }]
  })
    .limit(4)
    .select('title summary safetyNotes tags');
};

const generateAdvice = async ({ question, location }) => {
  const related = await findRelatedEntries(question);

  const response = {
    intent: 'survival-guidance',
    certainty: related.length ? 'medium' : 'low',
    locationContext: location || 'not provided',
    safetyFirst: [
      'Stabilize hazards before action (weather, injury, terrain).',
      'Conserve energy and hydration before complex tasks.'
    ],
    steps: [
      'Assess immediate threats and move to safer ground if needed.',
      'Use available tools and simplest reliable method first.',
      'Set a 20-minute check cycle for warmth, water, and signaling.'
    ],
    references: related,
    fallback: related.length
      ? null
      : 'No direct internal match found. Review related tags in the knowledge library and use conservative methods.'
  };

  return { systemPrompt: buildSystemPrompt(), response };
};

module.exports = { generateAdvice };
