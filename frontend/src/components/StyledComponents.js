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
    background-color: #ffff;
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
    ContainerChat: styled.div`
    margin-top: 60px;
    margin-left:60px;
    width: 400px; 
    height: 500px;
    padding: 10px;
    padding-bottom: 20px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    border: 1.5px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    font-family: "Dosis", sans-serif;
    background-color: #fff;
  `,
  HeaderChat: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
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
    /* align-items: center; */
    font-family: "Dosis", sans-serif; /* Use Dosis in content */
  `,
  StyledButton: styled.button`
    padding: 10px 20px;
    background-color: #28a745;
    width:100px;
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

  `,
  MessageList: styled.div`
  padding: 10px;
`,
MessageItem: styled.div`
  display: flex;
  flex-direction: ${({ isUserMessage }) => (isUserMessage ? 'row-reverse' : 'row')};
  margin-bottom: 10px;
  align-items: flex-start;
`,
SenderName: styled.div`
  font-weight: bold;
  margin-right: ${({ isUserMessage }) => (isUserMessage ? '0' : '8px')};
  margin-left: ${({ isUserMessage }) => (isUserMessage ? '8px' : '0')};
  color: #555;
`,
MessageText: styled.div`
  background-color: ${({ isUserMessage }) => (isUserMessage ? '#daf8cb' : '#f1f1f1')};
  padding: 8px 12px;
  border-radius: 15px;
  max-width: 100%;
  text-align: ${({ isUserMessage }) => (isUserMessage ? 'right' : 'left')};
  color: #333;
`,
MessageInput: styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  margin-top: auto;
  width: 100%;
`,
ButtonSend: styled.button`
  color: #fff;
  padding: 5px;
  background-color: #919191;
  border-radius: 10px;

    &:hover {
      outline: none;
      color: #ffff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Optional shadow for emphasis */
      background-color: #707070;
    }
`,
MessageInputChat:styled.input`
    padding: 10px;
    font-family: "Dosis", sans-serif;
    border: 1px solid #8a8a8a; /* Change this to your desired color */
    border-radius: 15px;
    font-size: 16px;
    width: 350px;
    transition: border-color 0.3s ease; /* Smooth transition for border color */
    background-color: #ffff;

    &:focus {
        border-color: #000; /* Change border color to green on focus */
        outline: none; /* Remove default outline */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Optional shadow for emphasis */
    }
  `,
};