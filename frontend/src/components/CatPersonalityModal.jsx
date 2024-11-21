import React, { useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

import cowcatImg from '../assets/blackwhitecat.png';
import orangeImg from '../assets/orangecat.png';
import threecolorImg from '../assets/threecolorcat.png';
import fishpaoImg from '../assets/greywhitecat.png';

import brownCat1Img from '../assets/cowcatdescript.png';
import brownCat2Img from '../assets/orangecatdescript.png';
import brownCat3Img from '../assets/threecolorcatdescript.png';
import brownCat4Img from '../assets/fishpaocatdescript.png';

const CatPersonalityModal = ({ isVisible, onClose }) => {
  const [selectedCat, setSelectedCat] = useState(null);

  const firstSet = [
    { name: 'แมววัว', image: cowcatImg },
    { name: 'แมวส้ม', image: orangeImg },
    { name: 'แมวสามฉี', image: threecolorImg },
    { name: 'แมวปลาเผา', image: fishpaoImg },
  ];

  const brownCatSet = [brownCat1Img, brownCat2Img, brownCat3Img, brownCat4Img]; // รูป browncat ที่จะเปลี่ยนไปตามลำดับ

  const handleCatClick = (cat, index) => {
    setSelectedCat({ ...cat, image: brownCatSet[index] }); // ใช้ลำดับ index เพื่อเลือก browncat ที่เหมาะสม
  };

  const handleBackToFirstSet = () => {
    setSelectedCat(null); // รีเซ็ตการเลือก
  };

  const handleCloseModal = () => {
    setSelectedCat(null); // รีเซ็ต state ทั้งหมดเมื่อปิด modal
    onClose();
  };

  return (
    <StyledModal
      visible={isVisible}
      onCancel={handleCloseModal}
      footer={null}
      width={selectedCat ? 800 : 1100}
      bodyStyle={{backgroundColor: '#ffff' }}
      centered
    >
      {selectedCat ? (
        <>
        <FullImageContainer>
          <img src={selectedCat.image} alt={selectedCat.name} className="full-image" />
        </FullImageContainer>
        </>
      ) : (
        <ImageGrid>
          {firstSet.map((cat, index) => (
            <ImageItem key={index} onClick={() => handleCatClick(cat, index)}>
              <img src={cat.image} alt={cat.name} className="cat-thumbnail" />
            </ImageItem>
          ))}
        </ImageGrid>
      )}
    </StyledModal>
  );
};

export default CatPersonalityModal;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    width: 500px;
    height: auto;
    padding: 40px;
    justify-self: center;

    @media (max-width: 768px) {
    border-radius: 12px;
    width: 300px;
    padding: 30px;
    justify-self: center;

    }
  }

  .ant-modal-header {
    border-bottom: none;
    padding: 0;
  }

  .ant-modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-modal-close-x {

}
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 70px;
  @media (max-width: 768px) {
    gap: 20px;
    }
`;

const ImageItem = styled.div`
  cursor: pointer;


  .cat-thumbnail {
    width: 100px;
    height: auto;
    object-fit: cover;
    border-radius: 0px;
    transition: transform 0.3s;
    @media (max-width: 768px) {
      width: 90px;
    }
  }

  &:hover .cat-thumbnail {
    transform: scale(1.05);
  }
`;

const FullImageContainer = styled.div`
  position: relative;

  .full-image {
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: contain;
    border-radius: 12px;
  }
`;

