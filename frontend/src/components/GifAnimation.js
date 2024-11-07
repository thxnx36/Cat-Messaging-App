// GifAnimation.js
import React from 'react';
import styled from 'styled-components';
import yourGif from '../assets/catwalk2.gif'; // เปลี่ยน path เป็น path ที่ถูกต้องของ GIF

const AnimatedGif = styled.img`
  position: absolute; // ใช้ absolute positioning
  width: 300px; /* ปรับขนาดให้เหมาะสม */
  animation: moveGif 20s linear infinite; /* ปรับระยะเวลาได้ตามต้องการ */
  
  // ปรับตำแหน่งเริ่มต้น
  top: 84%; // ตั้งค่าให้ GIF อยู่กลางในแนวตั้ง
  left: -300px; // เริ่มจากด้านซ้ายด้านนอกหน้าจอ (ขนาดของ GIF)

  @keyframes moveGif {
    0% {
      transform: translate(0, -50%); /* เริ่มที่ตำแหน่งเริ่มต้น */
      opacity: 1; /* เริ่มเห็น */
    }
    90% {
      opacity: 0.8; /* ค่อยๆ เฟดลง */
    }
    95% {
      opacity: 0.5; /* ค่อยๆ เฟดลง */
    }
    97% {
      opacity: 0.3; /* ค่อยๆ เฟดลง */
    }
    100% {
      transform: translate(100vw, -50%); /* สิ้นสุดที่ขวาสุด */
      opacity: 0; /* ทำให้หายไป */
    }
  }
`;

const GifAnimation = () => {
  return (
    <AnimatedGif src={yourGif} alt="Animated GIF" />
  );
};

export default GifAnimation;
