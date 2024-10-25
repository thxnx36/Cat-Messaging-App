const User = require('../models/User');
const jwt = require('jsonwebtoken');

// การลงทะเบียนผู้ใช้
exports.registerUser = async (req, res) => {
    let { username, email, password } = req.body;
    console.log('Received:', req.body); // Debugging

    username = username.trim();
    email = email.trim().toLowerCase(); // lowercase email
    password = password.trim(); // Trim password

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // ใช้ bcrypt แฮชรหัสผ่าน
        const newUser = new User({ username, email, password });        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user: ' + error.message });
    }
};

// การล็อกอินผู้ใช้
exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

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

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // สร้าง token
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token, username: user.username }); // ส่ง username กลับด้วย
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
