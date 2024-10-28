import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import { Dropdown, message, Modal } from 'antd';

const Home = ({ onLogout }) => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate(); // ใช้ useNavigate

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
        // Show the success message first
        message.success('BYE BYE!');
        
        // Call onLogout after a short delay
        setTimeout(() => {
          onLogout();
        }, 500); // Delay for half a second
      },
    });
  };

  const menuItems = [
    {
      key: 'logout',
      label: 'Log out',
      onClick: handleLogout,
    },
  ];

  // ฟังก์ชันในการนำทางไปยังหน้าแชท
  const handleChatClick = () => {
    navigate('/chat'); // นำทางไปยังหน้าแชท
  };

  return (
    <Container>
      <Header>
        <Logo>MyApp</Logo>
        <Nav>
          {username ? ( // Show username if logged in
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
              <span>
                <Username aria-label="User menu">
                  {username} <span>☁</span>
                </Username>
              </span>
            </Dropdown>
          ) : (
            <StyledLink to="/login">Log in</StyledLink>
          )}
        </Nav>
      </Header>
      <Content>
        <h1>Welcome to the Chat Application</h1>
        {username && ( // แสดงปุ่มเฉพาะเมื่อมีผู้ล็อกอิน
          <StyledButton onClick={handleChatClick}>
            Go to Chat
          </StyledButton>
        )}
      </Content>
    </Container>
  );
};

export default Home;

// Styled components remain unchanged

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Username = styled.span`
  font-size: 16px;
  cursor: pointer;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
