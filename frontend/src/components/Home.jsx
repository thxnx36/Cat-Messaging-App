import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Dropdown, message, Modal } from 'antd';
import { StyledComponents } from './StyledComponents';
import logoImage from '../assets/logomeowssage.png';

const Home = ({ onLogout }) => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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
  
  const handleChatClick = () => {
    navigate('/chat');
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
          <StyledComponents.StyledButton onClick={handleChatClick}>
          </StyledComponents.StyledButton>
        )}
      </StyledComponents.Content>
    </StyledComponents.Container>
  );
};

export default Home;
