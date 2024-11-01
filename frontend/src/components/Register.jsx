import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { StyledComponents } from './StyledComponents';
import logo from '../assets/meowssagelogowhite.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5003/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        message.success(data.message);
        navigate('/login');
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('Registration failed!');
    }
  };

  return (
    <StyledComponents.ContainerLogin>
      <StyledComponents.FormWrapper>
        <StyledComponents.Logo src={logo} alt="Logo" />
        <StyledComponents.Title>Register</StyledComponents.Title>
        <StyledComponents.Form onSubmit={handleRegister}>
          <StyledComponents.Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <StyledComponents.Button type="primary" htmlType="submit" block>
            Register
          </StyledComponents.Button>
        </StyledComponents.Form>
        <StyledComponents.StyledLink to="/login">Already have an account? Log in</StyledComponents.StyledLink>
      </StyledComponents.FormWrapper>
    </StyledComponents.ContainerLogin>
  );
};

export default Register;
