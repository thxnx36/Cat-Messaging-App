import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StyledComponents } from './StyledComponents';
import logo from '../assets/logomeowssage.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5003/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('username', data.username);
        onLogin(data.username);
        navigate('/');
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('Login failed!');
    }
  };

  return (
    <StyledComponents.ContainerLogin>
      <StyledComponents.FormWrapper>
        <StyledComponents.Logo src={logo} alt="Logo" />
        <StyledComponents.Title>Login</StyledComponents.Title>
        <StyledComponents.Form onSubmit={handleLogin}>
          <StyledComponents.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledComponents.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledComponents.Button  type="primary" htmlType="submit" block>
            Log in
          </StyledComponents.Button>
        </StyledComponents.Form>
        <StyledComponents.StyledLink to="/register">Don't have an account? Register</StyledComponents.StyledLink>
      </StyledComponents.FormWrapper>
    </StyledComponents.ContainerLogin>
  );
};

export default Login;
