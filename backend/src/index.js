require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io'); 

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// เชื่อมต่อเส้นทาง
app.use('/api/users', userRoutes);

// ฟังก์ชันสำหรับค้นหาผู้ใช้โดยอีเมล
const findUserByEmail = async (email) => {
  // ใช้ mongoose เพื่อค้นหาผู้ใช้ในฐานข้อมูล
};

// ฟังก์ชันสำหรับตรวจสอบรหัสผ่าน
const isValidPassword = (user, password) => {
  // เพิ่มตรรกะสำหรับการตรวจสอบรหัสผ่าน
};

// เส้นทางสำหรับการล็อกอิน
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email); 
  if (!user || !isValidPassword(user, password)) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json({ username: user.username }); 
});

// เมื่อมีผู้ใช้เชื่อมต่อ
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
      io.emit('chat message', msg); 
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
