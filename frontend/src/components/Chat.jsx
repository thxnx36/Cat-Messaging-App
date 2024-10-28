import React, { useEffect, useState } from 'react';
import { Input, Button, Dropdown, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StyledComponents } from './StyledComponents';
import logoImage from '../assets/logomeowssage.png';

const Chat = ({ onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
   
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Retrieve username from localStorage
    }
  }, []);
  const handleLogoClick = () => {
    navigate('/'); // เปลี่ยนเส้นทางไปยังหน้า Home
  };
  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
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
          localStorage.removeItem('username'); // Clear username from localStorage
          onLogout();
        }, 500);
      },
      wrapClassName: 'custom-modal',
      okButtonProps: {
        style: {
          backgroundColor: '#6a94b1',
          color: '#fff',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: '#646464',
          color: '#fff',
        },
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
    }
  ];

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <StyledComponents.Container>
      <StyledComponents.Header>
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
      </StyledComponents.Header>
      <StyledComponents.Content>
        <StyledComponents.MessageList>
          {messages.map((item, index) => (
            <StyledComponents.MessageItem
              key={index}
              isUserMessage={item.sender === 'user'}
            >
              <StyledComponents.MessageText>
                {item.text}
              </StyledComponents.MessageText>
              <StyledComponents.SenderName>
                {item.sender === 'user' ? 'You' : 'Other User'}
              </StyledComponents.SenderName>
            </StyledComponents.MessageItem>
          ))}
        </StyledComponents.MessageList>
        <StyledComponents.MessageInput>
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type your message..."
            style={{ flexGrow: 1 }} // Makes the input flexible
          />
          <Button type="primary" onClick={handleSend}>Send</Button>
        </StyledComponents.MessageInput>
      </StyledComponents.Content>
    </StyledComponents.Container>
  );
};

export default Chat;
