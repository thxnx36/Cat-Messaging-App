import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Dropdown, message, Modal } from 'antd';
import { StyledComponents } from './StyledComponents';
import logoImage from '../assets/meowssagelogo.png';
import { io } from 'socket.io-client';
import ChatModal from './ChatModal';
import GifAnimation from './GifAnimation';
import boxImage from '../assets/catbox.png';
import CatPersonalityModal from './CatPersonalityModal'; // นำเข้า CatPersonalityModal

const Home = ({ onLogout }) => {
  const [username, setUsername] = useState(null);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCatPersonalityModalVisible, setIsCatPersonalityModalVisible] = useState(false); // สถานะสำหรับ CatPersonalityModal
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
          socket.emit('logout', username);
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

  const handleNewButtonClick1 = () => {
    console.log("Button 1 clicked!");
  };

  const handleNewButtonClick2 = () => {
    setIsCatPersonalityModalVisible(true); // เปิด CatPersonalityModal
  };

  return (
    <StyledComponents.Container style={{ overflow: 'hidden', position: 'relative' }}>
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
      <StyledComponents.Content style={{ position: 'relative' }}>
        {username && (
          <>
            <StyledComponents.StyledButton onClick={handleChatClick}>
              {/* ปุ่มสำหรับเปิด Modal หลัก */}
            </StyledComponents.StyledButton>
            <div style={{ 
              position: 'absolute', 
              top: '20px', 
              left: '0', 
              right: '0', 
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 20px',
            }}>
              <StyledComponents.StyledButton1 onClick={handleNewButtonClick1}>
                {/* ปุ่มสำหรับเปิด Modal แบบทดสอบ */}
              </StyledComponents.StyledButton1>
              <StyledComponents.StyledButton2 onClick={handleNewButtonClick2}>
                {/* ปุ่มสำหรับเปิด Modal นิสัยแมว */}
              </StyledComponents.StyledButton2>
            </div>

            <div>{onlineUsersCount} online cats</div>
          </>
        )}
      </StyledComponents.Content>
      <GifAnimation />

      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        right: '20px', 
        width: '220px',
        height: '220px',
        backgroundImage: `url(${boxImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        zIndex: 10,
      }} />
      
      <StyledComponents.Footer style={{ position: 'relative', zIndex: 5 }}>
        <StyledComponents.FooterText>
          Meowssage
        </StyledComponents.FooterText>
      </StyledComponents.Footer>

      <ChatModal 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        username={username}  
      />
      <CatPersonalityModal 
        isVisible={isCatPersonalityModalVisible} 
        onClose={() => setIsCatPersonalityModalVisible(false)} 
      />
    </StyledComponents.Container>
  );
};

export default Home;
