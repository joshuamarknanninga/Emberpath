const { generateAdvice } = require('../services/aiService');

const advice = async (req, res) => {
  const { question, location } = req.body;
  if (!question) return res.status(400).json({ message: 'Question is required' });

  const result = await generateAdvice({ question, location });
  res.json(result);
};

module.exports = { advice };
