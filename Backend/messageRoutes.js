// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('./messageController');

// Route for sending a message
router.post('/send', messageController.sendMessage);

module.exports = router;
