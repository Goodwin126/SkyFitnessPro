import styled from 'styled-components';

export const StyledPhotoBox = styled.div`
  position: relative;
  width: 197px;
  height: 197px;
  border-radius: 20px;
  overflow: visible;

  @media (max-width: 767px) {
    width: 141px;
    height: 141px;
  }
`;

export const StyledProfilePhotoRectangle = styled.img`
  height: 100%;
  width: 197px;
`;

export const StyledProfilePhotoIcon = styled.img`
  position: absolute;
  width: 72px;
  height: 72px;
  top: 29px;
  left: 62px;

  overflow: hidden;
  pointer-events: none;

  @media (max-width: 767px) {
    width: 52px;
    height: 52px;
    left: 48px;
  }
`;

export const StyledProfilePhotoEllipse = styled.img`
  position: absolute;
  width: 211px;
  height: 72px;
  top: 125px;

  overflow: hidden;
  pointer-events: none;

  @media (max-width: 767px) {
    width: 151px;
    height: 52px;
    top: 90px;
  }
`;
