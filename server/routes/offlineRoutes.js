const express = require('express');
const { buildPack, exportPack } = require('../controllers/offlineController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/packs', requireAuth, buildPack);
router.get('/packs/:id/export', requireAuth, exportPack);

module.exports = router;
