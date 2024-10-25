// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import { Input, Button, List } from 'antd';
import io from 'socket.io-client';

const socket = io('http://localhost:5003'); // เปลี่ยนเป็น URL ของเซิร์ฟเวอร์ของคุณ

const Chat = ({ username, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      socket.emit('chat message', { username, text: messageInput });
      setMessageInput('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <Button onClick={onLogout}>Logout</Button>
      <List
        bordered
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.username}: </strong> {item.text}
          </List.Item>
        )}
      />
      <Input
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onPressEnter={handleSendMessage}
        placeholder="Type your message..."
      />
      <Button type="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </div>
  );
};

export default Chat;
