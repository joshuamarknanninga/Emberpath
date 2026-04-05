const express = require('express');
const { advice } = require('../controllers/aiController');

const router = express.Router();

router.post('/advice', advice);

module.exports = router;
