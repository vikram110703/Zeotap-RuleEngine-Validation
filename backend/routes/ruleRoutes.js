const express = require('express');
const router = express.Router();
const { createRule, evaluateRule } = require('../controllers/ruleController');

// Route to create a rule
router.post('/create', createRule);

// Route to evaluate a rule
router.post('/evaluate', evaluateRule);

module.exports = router;
