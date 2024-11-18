const { pool } = require('../config/database.js');
const express = require('express');
const { addBook } = require('../controllers/book.js');

const router = express.Router();
router.post('/', addBook);

module.exports = router;