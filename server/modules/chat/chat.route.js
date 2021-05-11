const express = require('express');
const router = express.Router();
const ChatController = require('./chat.controller');
const { auth } = require('../../middleware');

router.get('/get-all-conversations', auth, ChatController.getAllConversations)
router.post('/create-conversations', auth, ChatController.createConversation)



module.exports = router;