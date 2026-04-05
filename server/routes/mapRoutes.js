const express = require('express');
const { listReports, createReport } = require('../controllers/mapController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/reports', listReports);
router.post('/reports', requireAuth, createReport);

module.exports = router;
