import styled from 'styled-components';

export const StyledAdvertBanner = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  height: 486px;
  width: 100%;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  overflow: visible;
  @media (max-width: 767px) {
    height: auto;
    box-shadow: none;
  }
`;

export const StyledAdvertBannerInfo = styled.div`
  padding-left: 40px;
  padding-top: 40px;
  z-index: 10; /* Текст поверх всего */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;

  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    border-radius: 30px;
    background-color: #ffffff;
    box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
    overflow: visible;
    padding: 30px;
    z-index: 120;
  }
`;

export const StyledAdvertBannerTitle = styled.article`
  width: 398px;
  font-weight: 500;
  font-size: 60px;
  color: rgba(0, 0, 0, 1);
  line-height: 0.95;

  @media (max-width: 767px) {
    font-size: 34px;
    width: 230px;
  }
`;

export const StyledAdvList = styled.ul`
  list-style: none;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  font-weight: 400;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

export const StyledAdvListItem = styled.li`
  font-weight: 400;
  font-size: 24px;
  list-style-type: disc;
  color: rgba(0, 0, 0, 1);
  opacity: 0.5;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

export const StyledAdvBtb = styled.button`
  width: auto;
  height: 52px;
  border-radius: 46px;

  background-color: #bcec30;
  color: #000000;
  border: none;
  cursor: pointer;

  font-weight: 400;
  font-size: 18px;

  &:hover {
    background-color: #c6ff00;
    transform: scale(1.02);
  }

  &:active {
    background-color: #000000;
    color: #ffffff;
    transform: scale(0.98);
  }
`;

export const StyledAdvertVectorImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  @media (max-width: 767px) {
    bottom: 222px;
    width: 482px;
    height: 455px;
    left: -16px;
    top: auto;
  }
`;

export const StyledAdvertVectorImg = styled.img`
  right: 23px;
  height: 400px;
  position: absolute;
  top: 125px;

  @media (max-width: 767px) {
    width: 100%;
    bottom: 0px;
    height: auto;
  }
`;

export const StyledAdvertVector2Img = styled.img`
  position: absolute;
  width: 50px;
  height: 42.5px;
  bottom: 410px;
  right: 378px;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const StyledAdvertVector2MFImg = styled.img`
  display: none;
  @media (max-width: 767px) {
    display: block;
    right: 378px;
    position: absolute;
    z-index: 110;
    width: 32px;
    height: 27px;
    bottom: 565px;
    left: 172px;
  }
`;

export const StyledAdvertAthleteImg = styled.img`
  position: absolute;
  right: 30px;
  height: 540px;
  width: auto;
  transform: translateY(-80px);
  z-index: 3;

  @media (max-width: 767px) {
    bottom: 190px;
    right: -78px;
    width: 482px;
    height: auto;
    z-index: 0;
  }
`;
