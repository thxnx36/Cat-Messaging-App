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

// ประกาศตัวแปรสำหรับเก็บผู้ใช้ที่ล็อกอินเพียงครั้งเดียว
const connectedUsers = new Set(); 

io.on('connection', (socket) => {
  console.log('User connected');

  // เมื่อผู้ใช้ล็อกอิน
  socket.on('login', (username) => {
    connectedUsers.add(username);
    socket.username = username; // เก็บชื่อผู้ใช้ใน socket
    io.emit('user list', Array.from(connectedUsers)); // ส่งรายชื่อผู้ใช้ที่เชื่อมต่ออยู่
    io.emit('user count', connectedUsers.size); // ส่งจำนวนผู้ใช้ที่ออนไลน์
  });
  
  // เมื่อผู้ใช้ล็อกเอาต์
  socket.on('logout', (username) => {
    if (connectedUsers.has(username)) {
      connectedUsers.delete(username);
      io.emit('user list', Array.from(connectedUsers)); // ส่งรายชื่อผู้ใช้ที่เชื่อมต่ออยู่
      io.emit('user count', connectedUsers.size); // ส่งจำนวนผู้ใช้ออนไลน์
    }
  });

  // เมื่อผู้ใช้ตัดการเชื่อมต่อ
  socket.on('disconnect', () => {
    console.log('User disconnected');
    if (socket.username) { // ตรวจสอบว่ามีชื่อผู้ใช้ไหม
      connectedUsers.delete(socket.username); // ลบชื่อผู้ใช้จาก Set
      io.emit('user list', Array.from(connectedUsers)); // ส่งรายชื่อผู้ใช้ที่เชื่อมต่ออยู่
      io.emit('user count', connectedUsers.size); // ส่งจำนวนผู้ใช้ออนไลน์
    }
  });
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
