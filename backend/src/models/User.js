// backend/src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    status: { type: String, default: 'offline' },
});

// การตรวจสอบรหัสผ่าน
userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log('Comparing passwords:', candidatePassword, this.password); // Debugging
    const match = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password match:', match); // Check if the passwords match
    return match;
    
};



// แฮชรหัสผ่านก่อนบันทึก
userSchema.pre('save', async function (next) {
    // เช็คว่ารหัสผ่านถูกแก้ไขหรือไม่ ถ้าไม่ก็ข้ามการแฮช
    if (!this.isModified('password')) return next();
    
    // แฮชรหัสผ่าน
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  


// สร้างโมเดล User
const User = mongoose.model('User', userSchema);
module.exports = User;
