// backend/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // ต้องมี middleware นี้
app.use(cors()); // อนุญาต CORS สำหรับทุกโดเมน

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// เชื่อมต่อเส้นทาง
app.use('/api/users', userRoutes);

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials (this might involve checking a database)
  const user = await findUserByEmail(email); // Fetch user by email
  if (!user || !isValidPassword(user, password)) { // Implement your own validation logic
      return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Assuming `user` has a `username` field
  res.json({ username: user.username }); // Ensure this line returns the username
});


// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
