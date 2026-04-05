const MapReport = require('../models/MapReport');
const User = require('../models/User');

const listReports = async (req, res) => {
  const reports = await MapReport.find().sort({ createdAt: -1 }).limit(200);
  res.json(reports);
};

const createReport = async (req, res) => {
  const report = await MapReport.create({ ...req.body, user: req.userId });
  await User.findByIdAndUpdate(req.userId, { $inc: { points: 5 } });
  res.status(201).json(report);
};

module.exports = { listReports, createReport };
