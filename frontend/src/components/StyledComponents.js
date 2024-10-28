import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';

// Global Styles
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=DynaPuff:wght@400..700&family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Tiny5&display=swap');

  /* Global styling */
  body {
    margin: 0;
    font-family: "Dosis", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9fafb;
  }

  code {
    font-family: 'Dosis', 'Courier New', monospace;
  }

  a {
    text-decoration: none;
    color: #007bff;
    &:hover {
      /* text-decoration: underline; */
    }
  }
`;

export const StyledComponents = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; /* Ensure container takes full viewport height */
    justify-content: flex-start; /* Align items at the start */
    background-color: #f9fafb;
    font-family: "Dosis", sans-serif; // Keep this for consistency
  `,
  ContainerLogin: styled.div`
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 100vh; /* Full viewport height */
    background-color: #383838; /* Optional: background color */
    font-family: "Dosis", sans-serif; // Keep this for consistency
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-between; /* Keep space between logo and username */
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: "Dosis", sans-serif;
    position: relative; /* Ensure header's children can position themselves absolutely */
  `,
  Logo: styled.img`
    width: 200px; /* Adjust logo size if necessary */
    height: auto;
  `,
  Nav: styled.div`
    display: flex;
    align-items: center;
  `,
  Username: styled.span`
    font-family: "Josefin Sans", sans-serif;
    font-size: 20px;
    cursor: pointer;
    margin-left: 15px; 
    font-family: "Dosis", sans-serif; /* Use Dosis for username */
  `,
  Content: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Dosis", sans-serif; /* Use Dosis in content */
  `,
  StyledButton: styled.button`
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: "Josefin Sans", sans-serif;

    &:hover {
      background-color: #218838;
    }
  `,
  Button: styled.button`
    width: 120px;
    background-color: #525252;
    margin: 10px;
    padding: 8px;
    align-self: center;
    color: #fff;
    border-radius: 15px;
    font-weight: 800;
    border: none; /* Remove default border */
    transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */
    font-size: 18px;

    &:hover {
      background-color: #000; /* Darker shade on hover */
      transform: scale(1.05); /* Slightly enlarge on hover */
    }

    &:active {
      transform: scale(0.95); /* Slightly shrink on active */
    }
  `,
  StyledLink: styled(Link)`
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #525252;
    font-size: 18px;
    padding: 5px 10px; /* เพิ่ม padding */
    border: 2px solid transparent; /* ขอบเริ่มต้น */
    border-radius: 20px; /* ขอบมน */
    transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease, border-color 0.3s ease; /* การเปลี่ยนแปลง */
    font-family: "Dosis", sans-serif; /* Use Dosis for links */
    font-weight: 500;

    &:hover {
      color: #000; /* เปลี่ยนสีข้อความเป็นสีขาว */
      transform: scale(1.05); /* ขยายเล็กน้อยเมื่อชี้ */
    }

    &:active {
      transform: scale(0.95); /* ย่อเมื่อกด */
    }
  `,
  StyledLinkHome: styled(Link)`  /* Removed duplicate definition */
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #000;
    font-size: 18px;
    padding: 5px 10px; /* เพิ่ม padding */
    border: 2px solid transparent; /* ขอบเริ่มต้น */
    border-radius: 20px; /* ขอบมน */
    transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease, border-color 0.3s ease; /* การเปลี่ยนแปลง */
    font-family: "Dosis", sans-serif; /* Use Dosis for links */
    font-weight: 800;

    &:hover {
      background-color: #000; /* เปลี่ยนสีพื้นหลังเมื่อชี้ */
      color: #ffff; /* เปลี่ยนสีข้อความเป็นสีขาว */
      transform: scale(1.05); /* ขยายเล็กน้อยเมื่อชี้ */
    }

    &:active {
      transform: scale(0.95); /* ย่อเมื่อกด */
    }
  `,
  FormWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* Center children */
    width: 100%; /* Full width */
    max-width: 400px; /* Maximum width for the form */
    padding: 20px; /* Optional padding */
    background: white; /* Background for form wrapper */
    border-radius: 15px; /* Rounded corners */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  `,
  Title: styled.h2`
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    font-family: "Dosis", sans-serif; /* Use Dosis for title */
  `,
  Form: styled.form`
    font-family: "Dosis", sans-serif;
    font-weight: 500;
    display: flex;
    flex-direction: column;
  `,
  Input: styled.input`
    padding: 10px;
    font-family: "Dosis", sans-serif;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 15px;
    font-size: 16px;
    width: 350px;
    transition: border-color 0.3s ease; /* Smooth transition for border color */
    background-color: #ffff;

    &:focus {
      border-color: #000; /* Change border color to black on focus */
      outline: none; /* Remove default outline */
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Optional shadow for emphasis */
      background-color: #ebebeb;
    }
  `,
  MessageInput: styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
  `,
  LogoutButton: styled.button` /* Using styled.button directly */
    margin-bottom: 10px;
  `,
  MessageList: styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
`,
MessageItem: styled.div`
  background-color: ${props => (props.isUserMessage ? '#dcf8c6' : '#ffffff')}; /* Green for user messages */
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  align-self: ${props => (props.isUserMessage ? 'flex-end' : 'flex-start')}; /* Align based on sender */
  position: relative; /* For positioning sender name */
`,
MessageText: styled.span`
  display: block;
`,
SenderName: styled.span`
  font-size: 12px;
  color: #888;
  position: absolute;
  bottom: -15px; /* Position the sender name */
  left: 5px;
`,
};