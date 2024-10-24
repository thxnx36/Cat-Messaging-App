const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const router = express.Router();

// เส้นทางสำหรับส่งข้อความ
router.post('/', sendMessage);

// เส้นทางสำหรับรับข้อความกลุ่ม
router.get('/:groupId', getMessages);

module.exports = router;
