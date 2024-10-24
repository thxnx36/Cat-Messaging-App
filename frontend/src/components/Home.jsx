import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

const Home = ({ isLoggedIn, username, onLogout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={onLogout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Header>
        <Logo>MyApp</Logo>
        <Nav>
          {isLoggedIn ? (
            <Dropdown overlay={menu}>
                <Menu>
                    <Username>{username}</Username> 
                </Menu>
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

// สไตล์ต่างๆ
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
