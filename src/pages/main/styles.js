import styled from 'styled-components';

export const StyledContentLessons = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLessonsContainer = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 40px; /* Расстояние между блоками (аналог gap во Flex) */
  
  /* Гарантируем, что блоки растягиваются по ширине ячейки */
  justify-items: center;
}
`;

export const StyledButtonScroll = styled.button`
  text-align: center;
  width: 130px;
  height: 52px;
  border-radius: 46px;
  padding: 0 26px;

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

export const StyledBaseButton = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  cursor: pointer;
  font-weight: 400;
  font-size: 18px;
  border-radius: 46px;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const StyledButtonEnter = styled(StyledBaseButton)`
  background-color: #bcec30;
  color: #000000;

  &:hover {
    background-color: #c6ff00;
  }

  &:active {
    background-color: #000000;
    color: #ffffff;
  }
`;

export const StyledButtonRegistration = styled(StyledBaseButton)`
  background-color: white;
  color: #000000;
  border: 1px solid #000000;

  &:hover {
    background-color: rgba(247, 247, 247, 1);
  }

  &:active {
    background-color: rgba(233, 236, 237, 1);
  }
`;

export const StyledTextReset = styled.span`
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
  font-size: 18px;
`;

export const StyledTextError = styled.span`
  color: rgba(219, 0, 48, 1);
  font-weight: 400;
  font-size: 14px;
`;

export const StyledButtonScrollBox = styled.div`
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLogoImg = styled.img`
  width: 220px;
  height: 35px;
  margin-bottom: 44px;
`;

export const StyledInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 34px;
`;

export const StyledButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const StyledModalWindow = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 40px;
  border-radius: 30px;
  min-width: 223px;
  max-width: 360px;
  box-shadow: rgba(0, 0, 0, 0.13);
  text-align: center;

  h2 {
    margin-top: 0;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }
`;

export const StyledInputInfoEnter = styled.input`
  width: 280px;
  height: 52px;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-weight: 400;
  font-size: 18px;
  color: rgba(153, 153, 153, 1);

  ${props =>
    props.$hasError &&
    `
    border-color: rgba(219, 0, 48, 1);
  `}
`;
