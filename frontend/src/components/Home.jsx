import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Dropdown, message, Modal } from 'antd';
import { StyledComponents } from './StyledComponents';
import logoImage from '../assets/logomeowssage.png';
import { io } from 'socket.io-client';
import ChatModal from './ChatModal';

const Home = ({ onLogout }) => {
  const [username, setUsername] = useState(null);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const socket = io('http://localhost:5003');

    if (storedUsername) {
      socket.emit('login', storedUsername);
    }

    socket.on('user count', (count) => {
      setOnlineUsersCount(count);
    });

    return () => {
      // ไม่ส่งคำสั่ง logout เมื่อเปลี่ยนหน้า
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to log out?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        if (username) {
          const socket = io('http://localhost:5003');
          socket.emit('logout', username); // ส่งคำสั่ง logout
        }
        message.success('BYE BYE!');
        setTimeout(() => {
          localStorage.removeItem('username');
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
  
  const handleChatClick = () => {
    setIsModalVisible(true);
  };

  return (
    <StyledComponents.Container>
      <StyledComponents.Header>
        <StyledComponents.Logo src={logoImage} alt="Meowssage Logo" /> 
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
        {username && (
          <>
            <StyledComponents.StyledButton onClick={handleChatClick}>
              {/* ปุ่มสำหรับเปิด Modal */}
            </StyledComponents.StyledButton>
            <div>{onlineUsersCount} online cats</div>
          </>
        )}
      </StyledComponents.Content>
      <StyledComponents.Footer>
        <StyledComponents.FooterText>
          © 2024 Meowssage
        </StyledComponents.FooterText>
      </StyledComponents.Footer>

      <ChatModal 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        username={username}  
      />
    </StyledComponents.Container>
  );
};

export default Home;
