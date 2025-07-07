// routes/statistics.js
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// Route für Statistiken
router.get('/', statisticsController.getStatistics);

module.exports = router;
