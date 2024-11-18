const express = require('express');
const { getChatResponse } = require('../controllers/chatbot.js');

const router = express.Router();

router.post('/', getChatResponse);

module.exports = router;
