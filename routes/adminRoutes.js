const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/summary', adminController.getStoreSummary);

module.exports = router;
