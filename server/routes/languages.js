const express = require('express');
const { getLanguageNameByCode } = require('../controllers/languages.js');

const router = express.Router();

// Define route for getting a language name by code (code is a path parameter)
router.get('/:code', getLanguageNameByCode);

module.exports = router;
