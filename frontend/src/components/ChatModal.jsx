import React, { useState } from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';

// Title styled component
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

// CustomButton styled component
const CustomButton = styled.button`
  background-color: ${(props) => props.isSelected ? '#007BFF' : '#363636'};
  color: white;
  padding: 10px 15px; /* ปรับขนาด padding */
  border-radius: 15px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* เพิ่มการเปลี่ยนแปลงสีพื้นหลัง */

  &:hover {
  }
`;

// CloseButton styled component
const CloseButton = styled.button`
  position: absolute;
  margin-top: -25px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #000;

  &:hover {
    color: #900000; /* เปลี่ยนสีเมื่อ hover */
  }
`;

// StyledModal styled component
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 90%;
  max-width: 600px;
  padding: 1.5rem;

  @media (min-width: 640px) {
    width: 80%;
  }
`;

// Overlay styled component
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ChatModal = ({ isVisible, onClose, username }) => {
  const [catColor, setCatColor] = useState('แมวดำขาว');
  const [roomType, setRoomType] = useState('just me');
  const [selectedColor, setSelectedColor] = useState(''); // State สำหรับสีที่เลือก
  const [selectedRoomType, setSelectedRoomType] = useState(''); // State สำหรับประเภทห้องที่เลือก

  const handleColorChange = (color) => {
    setCatColor(color);
    setSelectedColor(color); // บันทึกสีที่เลือก
  };

  const handleRoomTypeChange = (type) => {
    setRoomType(type);
    setSelectedRoomType(type); // บันทึกประเภทห้องที่เลือก
  };

  // ตัวเลือกสีของแมว
  const catColors = {
    แมวดำขาว: '#000000',
    แมวส้ม: '#FFA500',
    แมวเห็ด: '#756247',
    แมวเทาขาว: '#808080',
    แมวสามสี: '#ffffff',
  };

  // URL ของภาพแมวตามสี
  const catImages = {
    แมวดำขาว: require('../assets/blackwhitecat.png'),
    แมวส้ม: require('../assets/orangecat.png'),
    แมวเห็ด: require('../assets/browncat.png'),
    แมวเทาขาว: require('../assets/greywhitecat.png'),
    แมวสามสี: require('../assets/threecolorcat.png'),
  };

  if (!isVisible) return null; // ไม่แสดง modal หาก isVisible เป็น false

  return (
    <>
      <Overlay onClick={onClose} />
      <StyledModal>
        {/* Close Button */}
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <div className="title">
          <Title>Welcome, {username}!</Title>

          {/* Color Selection */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg mb-4" style={{ fontSize: '22px'}}>Choose your cat color:</h3>
            <div className="flex space-x-2 mb-4">
              {Object.keys(catColors).map((color) => (
                <label key={color} className="cursor-pointer">
                  <CustomButton
                    isSelected={selectedColor === color} // เช็คว่าปุ่มถูกเลือกหรือไม่
                    onClick={() => handleColorChange(color)} // เปลี่ยนสีเมื่อคลิก
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </CustomButton>
                </label>
              ))}
            </div>
            {/* Cat Image Preview */}
            <img
              src={catImages[catColor]} // ใช้ URL ของภาพแมวตามสีที่เลือก
              alt={`${catColor} cat`}
              style={{
                maxHeight: '150px',
                width: 'auto',
                objectFit: 'contain',
                marginTop: '15px'
              }}
            />
          </div>

          {/* Room Type Selection */}
          <div className="mt-6 text-center">
            <h3 className="text-lg mb-2" style={{ fontSize: '22px'}}>Choose chat room type:</h3>
            <div className="flex justify-center space-x-4">
              {['just me', 'with someone', 'party!'].map((type) => (
                <label key={type} className="cursor-pointer">
                  <CustomButton
                    isSelected={selectedRoomType === type} // เช็คว่าปุ่มถูกเลือกหรือไม่
                    onClick={() => handleRoomTypeChange(type)} // เปลี่ยนประเภทห้องเมื่อคลิก
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </CustomButton>
                </label>
              ))}
            </div>
          </div>

          {/* Start Chat Button */}
          <div className="text-center mt-6" style={{ fontSize: '22px', }}>
            <CustomButton onClick={() => alert(`Starting chat in "${roomType}" mode with a ${catColor}`)}>
              Start Chat!
            </CustomButton>
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default ChatModal;
