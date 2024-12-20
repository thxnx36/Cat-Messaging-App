import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import { GlobalStyles } from './components/StyledComponents';
import { message } from 'antd';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    if (user) {
      localStorage.setItem('username', user);
      setUsername(user);
      setIsLoggedIn(true);
      message.success('Login successful!');
    } else {
      console.error('User is undefined');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    message.success('Logged out successfully!');
    window.location.reload(); 
  };

  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route 
          path="/" 
          element={<Home onLogout={handleLogout} />} 
        />
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} 
        />
        <Route 
          path="/chat" 
          element={isLoggedIn ? <Chat username={username} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
