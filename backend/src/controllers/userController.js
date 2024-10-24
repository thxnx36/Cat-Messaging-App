// backend/src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ลงทะเบียนผู้ใช้
exports.registerUser = async (req, res) => {
  let { username, email, password } = req.body;
  console.log('Received:', req.body); // Debugging

  // Trim ข้อมูลจากฟอร์ม
  username = username.trim();
  email = email.trim().toLowerCase(); // lowercase email เพื่อป้องกันความผิดพลาด
  password = password.trim(); // Trim password here

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed at registration:', hashedPassword);
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user: ' + error.message });
  }
};

// ล็อกอินผู้ใช้
exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  console.log('Password entered:', password); // รหัสผ่านที่ผู้ใช้ป้อน

  email = email.trim().toLowerCase(); 
  password = password.trim(); 

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user);
    console.log('Hashed password in DB:', user.password);

    // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสผ่านที่แฮชในฐานข้อมูล
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // สร้าง token
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
