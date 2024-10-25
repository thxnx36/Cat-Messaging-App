import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, message, Modal } from 'antd';

const Home = ({ onLogout }) => {
  const [username, setUsername] = useState(null);

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
        onLogout();
        message.success('Logged out successfully');
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Header>
        <Logo>MyApp</Logo>
        <Nav>
          {username ? ( // Show username if logged in
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <span>
                <Username aria-label="User menu">
                  {username} ▼
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
  justify-content: center;
  align-items: center;
`;
