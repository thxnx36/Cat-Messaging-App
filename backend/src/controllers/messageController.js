const Message = require('../models/Message');

// ส่งข้อความ
exports.sendMessage = async (req, res) => {
  const { senderId, groupId, content } = req.body;
  try {
    const newMessage = new Message({ senderId, groupId, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// รับข้อความทั้งหมด
exports.getMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await Message.find({ groupId }).populate('senderId', 'username');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
