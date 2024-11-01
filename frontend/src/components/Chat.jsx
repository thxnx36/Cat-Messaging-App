import React, { useEffect, useState, useRef } from 'react';
import { Dropdown, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StyledComponents } from './StyledComponents';
import io from 'socket.io-client';
import logoImage from '../assets/logomeowssage.png';

const socket = io('http://localhost:5003'); // URL ของเซิร์ฟเวอร์ของคุณ

const Chat = ({ onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState(null);
  const [catColor, setCatColor] = useState(null); // State for selected cat color
  const [roomType, setRoomType] = useState(null); // State for selected room type
  const navigate = useNavigate();
  const messagesEndRef = useRef(null); // Ref for the message list

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Log selected cat color and room type
  useEffect(() => {
    console.log('Selected Cat Color:', catColor);
    console.log('Selected Room Type:', roomType);
  }, [catColor, roomType]);

  const handleLogoClick = () => {
    navigate('/'); // Navigate to Home
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      socket.emit('chat message', { username, text: newMessage });
      setNewMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // ป้องกันไม่ให้เกิดการรีเฟรชหน้า
      handleSend();
    }
  };

  const handleLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to log out?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        message.success('BYE BYE!');
        setTimeout(() => {
          localStorage.removeItem('username');
          onLogout();
        }, 500);
      },
    });
  };

  const menuItems = [
    {
      key: 'profile',
      label: 'Profile',
    },
    {
      key: 'settings',
      label: 'Settings',
    },
    {
      key: 'logout',
      label: 'Log out',
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <StyledComponents.HeaderChat>
        <StyledComponents.Logo src={logoImage} alt="Meowssage Logo" onClick={handleLogoClick} />
        <StyledComponents.Nav>
          {username ? (
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
              <span>
                <StyledComponents.Username aria-label="User menu">
                  {username} <span>☁</span>
                </StyledComponents.Username>
              </span>
            </Dropdown>
          ) : (
            <StyledComponents.StyledLinkHome to="/login">Log in</StyledComponents.StyledLinkHome>
          )}
        </StyledComponents.Nav>
      </StyledComponents.HeaderChat>
      <StyledComponents.ContainerChat>
        <StyledComponents.Content>
          <StyledComponents.MessageList>
            {messages.map((item, index) => (
              <StyledComponents.MessageItem
                key={index}
                isUserMessage={item.username === username}
              >
                <StyledComponents.SenderName isUserMessage={item.username === username}>
                  {item.username === username ? 'You' : item.username}
                </StyledComponents.SenderName>
                <StyledComponents.MessageText isUserMessage={item.username === username}>
                  {item.text}
                </StyledComponents.MessageText>
              </StyledComponents.MessageItem>
            ))}
            <div ref={messagesEndRef} /> {/* Reference for auto-scroll */}
          </StyledComponents.MessageList>
          <StyledComponents.MessageInput>
            <StyledComponents.MessageInputChat
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown} // เปลี่ยนเป็น onKeyDown
              placeholder="Type your message..."
              style={{ flexGrow: 1, width: '80%', marginRight: '10px' }}
            />
            <StyledComponents.ButtonSend type="primary" onClick={handleSend} style={{ width: '15%' }}>
              Send
            </StyledComponents.ButtonSend>
          </StyledComponents.MessageInput>
        </StyledComponents.Content>
      </StyledComponents.ContainerChat>
    </>
  );
};

export default Chat;
