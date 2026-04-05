const express = require('express');
const { listEntries, getEntry, saveEntry } = require('../controllers/knowledgeController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', listEntries);
router.get('/:id', getEntry);
router.post('/:id/save', requireAuth, saveEntry);

module.exports = router;
