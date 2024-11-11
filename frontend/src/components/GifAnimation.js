import React from 'react';
import styled from 'styled-components';
import yourGif from '../assets/catwalk2.gif'; // เปลี่ยน path เป็น path ที่ถูกต้องของ GIF

const AnimatedGif = styled.img`
  position: absolute;
  width: 300px; /* ขนาดปกติ */
  animation: moveGif 20s linear infinite;
  
  // ตั้งค่าตำแหน่งเริ่มต้นสำหรับจอใหญ่
  top: 84%;
  left: -300px; 

  @keyframes moveGif {
    0% {
      transform: translate(0, -50%);
      opacity: 1;
    }
    90% {
      opacity: 0.8;
    }
    95% {
      opacity: 0.5;
    }
    97% {
      opacity: 0.3;
    }
    100% {
      transform: translate(100vw, -50%);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    width: 200px; /* ลดขนาด GIF */
    top: 90%; /* ปรับตำแหน่งตามความเหมาะสม */
    animation: moveGif 15s linear infinite; /* ปรับความเร็วของ animation */
    top: 88%;
    left: -100px; 
  }
`;

const GifAnimation = () => {
  return (
    <AnimatedGif src={yourGif} alt="Animated GIF" />
  );
};

export default GifAnimation;
