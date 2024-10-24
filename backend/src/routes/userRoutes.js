// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// เส้นทางสำหรับการลงทะเบียนผู้ใช้
router.post('/register', userController.registerUser);

// เส้นทางสำหรับการล็อกอินผู้ใช้
router.post('/login', userController.loginUser);

module.exports = router;

