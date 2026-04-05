const express = require('express');
const { advice } = require('../controllers/aiController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/advice', requireAuth, advice);

module.exports = router;
