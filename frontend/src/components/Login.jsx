import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { StyledComponents } from './StyledComponents';
import logo from '../assets/meowssagelogowhite.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://172.20.10.13:3000/login', {
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
        // แสดงข้อความ error ที่มาจากเซิร์ฟเวอร์
        alert(`Error: ${data.message || 'Login failed.'}`);
      }
    } catch (error) {
      // แสดงข้อความ error ที่เกิดจากข้อผิดพลาดอื่น ๆ เช่น เซิร์ฟเวอร์ไม่ตอบสนอง
      alert(`Unexpected error: ${error.message}`);
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
          <StyledComponents.Button 
            type="primary" // ใช้ type แทน htmlType
            // แก้ไขค่าของ block เป็น string ถ้าจำเป็น หรือเอาออกถ้าไม่ใช้
            block="true" // ถ้า StyledComponents.Button ใช้ prop block ได้ ให้เปลี่ยนเป็น block={true} 
          >
            Log in
          </StyledComponents.Button>
        </StyledComponents.Form>
        <StyledComponents.StyledLink to="/register">Don't have an account? Register</StyledComponents.StyledLink>
      </StyledComponents.FormWrapper>
    </StyledComponents.ContainerLogin>
  );
};

export default Login;
