import React, { useState } from 'react';
import { Modal, Card } from 'antd';
import styled from 'styled-components';

import cowcatImg from '../assets/blackwhitecat.png';
import brownImg from '../assets/browncat.png';
import orangeImg from '../assets/orangecat.png';
import threecolorlImg from '../assets/threecolorcat.png';
import fishpaoImg from '../assets/greywhitecat.png';

import cowcatType from '../assets/typecowcat.png';
import brownType from '../assets/typebrowncat.png';
import orangeType from '../assets/typeorangecat.png';
import threecolorType from '../assets/typethreecolorcat.png';
import fishpaoType from '../assets/typefishpaoncat.png';

const CatPersonalityModal = ({ isVisible, onClose }) => {
  const [flippedCards, setFlippedCards] = useState({});

  const catPersonalities = [
    { name: 'แมววัว', description: 'Social, playful, and vocal.', image: cowcatImg, typeImage: cowcatType },
    { name: 'แมวส้ม', description: 'Calm, gentle, and affectionate.', image: orangeImg, typeImage: orangeType },
    { name: 'แมวเห็ด', description: 'Friendly, intelligent, and large.', image: brownImg, typeImage: brownType },
    { name: 'แมวปลาเผา', description: 'Energetic, playful, and curious.', image: fishpaoImg, typeImage: fishpaoType },
    { name: 'แมวสามฉี', description: 'Affectionate, warm, and hairless.', image: threecolorlImg, typeImage: threecolorType },
  ];

  const toggleCardFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <StyledModal
      title={<CenteredTitle>นิสัยแต่ละแมว</CenteredTitle>}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={1100}
      bodyStyle={{ padding: '20px', backgroundColor: '#fdf9f3' }}
      centered
    >
      <CardContainer>
        {catPersonalities.map((cat, index) => (
          <StyledCard
          key={index}
          onClick={() => toggleCardFlip(index)}
          flipped={flippedCards[index]}
          typeImage={cat.typeImage} // ส่งภาพพื้นหลังให้ card-back
        >
          <div className="card-inner">
            <div className="card-front">
              <img src={cat.image} alt={cat.name} className="cat-image" />
              <CardTitle>{cat.name}</CardTitle>
            </div>
            <div className="card-back">
              {/* ไม่ต้องมี <img> สำหรับ description image */}
            </div>
          </div>
        </StyledCard>
        
        ))}
      </CardContainer>
    </StyledModal>
  );
};

export default CatPersonalityModal;

const CenteredTitle = styled.h2`
  text-align: center;
  color: #6a94b1;
  font-weight: bold;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 30px;
  padding: 5px;
  justify-items: center;
  background-color: #fdf9f3;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 180px;
  min-width: 180px;
  height: 220px;
  position: relative;
  cursor: pointer;
  background: linear-gradient(135deg, #fdf9f3, #fdf9f3);
  border-radius: 16px;
  overflow: hidden; /* ควบคุมไม่ให้บางส่วนของ card ล้นออก */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  }
  .ant-card-body {
  padding: 0 !important;  /* ใช้ !important เพื่อให้แน่ใจว่า padding ถูกลบ */
  height: 100% !important;  /* ให้การ์ดสูงเต็มพื้นที่ */
}

  .card-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  }

  .card-front, .card-back {
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 16px;
  }

  .card-front {
    background-color: #fdf9f3;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .card-back {
    color: #000;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: ${({ typeImage }) => `url(${typeImage})`};
    background-size: cover;
    background-position: center;
    overflow: hidden;  /* ลบการ overflow */
    height: 220px;  /* ให้แน่ใจว่าพื้นที่ถูกใช้เต็ม */
    border-radius: 16px;
    width:160px;
    margin-left:10px;
  }

  .cat-image {
    width: 100%;
    height: auto;
    max-width: 120px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    position: center;
  }
`;

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #333;
  margin-top: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: #fdf9f3 !important;
    border-radius: 16px;
  }
  .ant-modal-header {
    background-color: #fdf9f3 !important;
  }
  .ant-modal-title {
    color: #6a94b1;
  }
  .ant-modal-body {
    background-color: #fdf9f3 !important;
    border-radius: 16px;
    padding: 0px  !important;
  }
`;
