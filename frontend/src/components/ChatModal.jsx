import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import Swal from 'sweetalert2';

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const CustomButton = styled.button.attrs(({ isSelected, ...rest }) => ({
  ...rest,
  style: {
    backgroundImage: `url(${rest.bgImage})`,
  },
}))`
  background-size: cover;
  background-repeat: no-repeat;
  color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 105px;
  height: 43px;
  max-width: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
    z-index: 1;
  }
`;

const CustomButton2 = styled.button.attrs(({ ...rest }) => ({
  ...rest,
  style: {
    backgroundImage: `url(${rest.bgImage})`,
  },
}))`
  background-size: cover;
  background-repeat: no-repeat;
  color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 137px;
  height: 54px;
  max-width: 100%;
`;

const HeartOverlay = styled(HeartIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  z-index: 2;
`;

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
    color: #900000;
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
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
  const navigate = useNavigate();
  const [catColor, setCatColor] = useState('แมววัว');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const handleColorChange = (color) => {
    setCatColor(color);
    setSelectedColor(color);
  };

  const handleRoomTypeChange = (type) => {
    setSelectedRoomType(type);
  };

  const handleStartChat = () => {
    if (!selectedColor || !selectedRoomType) {
      Swal.fire({
        title: 'อย่าลืม!',
        text: 'เลือกสีแมวและประเภทห้อง',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#5e3a3a',
      });
      return; 
    }

    console.log(`สีที่เลือก: ${selectedColor}, ประเภทห้อง: ${selectedRoomType}`);
    navigate('/chat', { state: { selectedColor, selectedRoomType } }); // Correctly navigate with state
};

  
  

  const catColors = {
    แมววัว: '#000000',
    แมวส้ม: '#FFA500',
    แมวเห็ด: '#756247',
    แมวปลาเผา: '#808080',
    แมวสามสี: '#ffffff',
  };

  const catImages = {
    แมววัว: require('../assets/blackwhitecat.png'),
    แมวส้ม: require('../assets/orangecat.png'),
    แมวเห็ด: require('../assets/browncat.png'),
    แมวปลาเผา: require('../assets/greywhitecat.png'),
    แมวสามสี: require('../assets/threecolorcat.png'),
  };

  const buttonCatImages = {
    แมววัว: require('../assets/cowcatbuttom.png'),
    แมวส้ม: require('../assets/orangecatbuttom.png'),
    แมวเห็ด: require('../assets/browncatbuttom.png'),
    แมวปลาเผา: require('../assets/fishpaocatbuttom.png'),
    แมวสามสี: require('../assets/threecolorcatbuttom.png'),
  };

  const buttonImages = {
    'just me': require('../assets/alonecatbuttom.png'),
    'with someone': require('../assets/withothercatbuttom.png'),
    'party!': require('../assets/partycatbuttom.png'),
  };

  const startChatImage = require('../assets/startchatbuttom.png');
  const titleImage = require('../assets/choosecolor.png');
  const titleImage2 = require('../assets/chooseroom.png');

  if (!isVisible) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <StyledModal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Welcome, {username}!</Title>
        <div className="flex justify-center mb-4">
          <img
            src={titleImage}
            alt="Choose your cat color"
            style={{ maxWidth: '50%', marginBottom: '-5px' }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {Object.keys(catColors).map((color) => (
              <label key={color} className="cursor-pointer">
                <CustomButton
                  isSelected={selectedColor === color}
                  bgImage={buttonCatImages[color]}
                  onClick={() => handleColorChange(color)}
                >
                  {selectedColor === color && <HeartOverlay />}
                </CustomButton>
              </label>
            ))}
          </div>
          <img
            src={catImages[catColor]}
            alt={`${catColor} cat`}
            style={{
              maxHeight: '150px',
              width: 'auto',
              objectFit: 'contain',
              marginTop: '15px',
            }}
          />
        </div>
        <div className="mt-6 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={titleImage2}
              alt="Choose your room type"
              style={{ maxWidth: '50%', marginBottom: '5px' }}
            />
          </div>
          <div className="flex justify-center space-x-4">
            {['just me', 'with someone', 'party!'].map((type) => (
              <label key={type} className="cursor-pointer">
                <CustomButton
                  isSelected={selectedRoomType === type}
                  bgImage={buttonImages[type]}
                  onClick={() => handleRoomTypeChange(type)}
                >
                  {selectedRoomType === type && <HeartOverlay />}
                </CustomButton>
              </label>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <CustomButton2 bgImage={startChatImage} onClick={handleStartChat} />
        </div>
      </StyledModal>
    </>
  );
};

export default ChatModal;
