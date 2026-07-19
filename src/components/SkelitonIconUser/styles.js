import styled from 'styled-components';

export const StyledPhotoBox = styled.div`
  position: relative;
  width: 197px;
  height: 197px;
  border-radius: 20px;
  overflow: visible;
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
`;

export const StyledProfilePhotoEllipse = styled.img`
  position: absolute;
  width: 211px;
  height: 72px;
  top: 125px;
  left: -7.17px;

  overflow: hidden;
  pointer-events: none;
`;
