import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, message } from 'antd';

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
        console.log(data); 

        if (response.ok) {
            localStorage.setItem('username', data.username); // บันทึก username
            onLogin(data.username); // เรียกใช้งาน onLogin เพื่ออัปเดตสถานะใน App
            navigate('/');
        } else {
            message.error(data.message);
        }
    } catch (error) {
        message.error('Login failed!');
    }
};

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form>
        <StyledLink to="/register">Don't have an account? Register</StyledLink>
      </FormWrapper>
    </Container>
  );
};

export default Login;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;