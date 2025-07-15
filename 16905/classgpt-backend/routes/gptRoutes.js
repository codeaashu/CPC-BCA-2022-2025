//gptRoutes.js
const express = require('express');
const router = express.Router();

const { summarizePdfHandler } = require('../controllers/gptController');
const multer = require('multer');
const upload = multer(); // Memory storage

router.post('/upload', upload.single('file'), summarizePdfHandler);

module.exports = router; // ✅ VERY IMPORTANT
