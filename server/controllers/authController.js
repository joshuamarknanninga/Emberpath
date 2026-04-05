const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { createToken } = require('../utils/token');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already used' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  res.status(201).json({
    token: createToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, points: user.points }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({
    token: createToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, points: user.points }
  });
};

const profile = async (req, res) => {
  const user = await User.findById(req.userId)
    .select('-passwordHash')
    .populate('savedEntries', 'title difficulty tags')
    .populate('badges');

  res.json(user);
};

module.exports = { register, login, profile };
