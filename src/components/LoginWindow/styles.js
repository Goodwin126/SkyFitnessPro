import styled from 'styled-components';

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

export const StyledTextError = styled.span`
  color: rgba(219, 0, 48, 1);
  font-weight: 400;
  font-size: 14px;
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
  margin-top: 34px,
  justifyContent: 'center'
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

  @media (max-width: 767px) {
    padding: 30px;
  }

  min-width: 223px;
  /* Styled Components сам передаст проп isCourseSelection внутрь функции */
  max-width: ${({ isCourseSelection }) => (isCourseSelection ? '460px' : '360px')};

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

export const StyledTextH2 = styled.h2`
  font-family: 'StratosSkyeng', sans-serif;
  margin-bottom: 38px;
  font-size: 32px;
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: 0;
  @media (max-width: 767px) {
    margin-bottom: 24px;
    text-align: left;
  }
`;
export const StyleBoxInfoExercises = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledWorkoutList = styled.ul`
  list-style: none;
  margin-bottom: 34px;
`;

export const StyledItemLi = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(196, 196, 196, 1);
  cursor: default;
  text-align: left;
  @media (max-width: 767px) {
    padding: 10px 0;
  }
`;

export const StyledIconComplited = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const StyledTextItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const StyledWorkoutLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  text-decoration: none;
  color: inherit;

  width: 100%;
  box-sizing: border-box;
  transition: opacity 0.2s ease;
`;

export const StyledBigText = styled.strong`
  font-weight: 400;
  font-size: 24px;
  line-height: 110%;
  letter-spacing: 0;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

export const StyledSmallText = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 110%;
  letter-spacing: 0;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;
