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

export const StyledTextError = styled.span`
  color: rgba(219, 0, 48, 1);
  font-weight: 400;
  font-size: 14px;
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
  height: 597px;
  max-width: 426px;
  box-shadow: rgba(0, 0, 0, 0.13);
  text-align: center;

  @media (max-width: 767px) {
    padding: 30px;
  }

  h2 {
    margin-top: 0;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }
`;

export const StyledTextH2 = styled.h2`
  font-family: 'StratosSkyeng', sans-serif;
  margin-bottom: 38px;
  font-size: 32px;
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: 0;
  text-align: left;
  @media (max-width: 767px) {
    margin-bottom: 24px;
  }
`;

export const StyleBoxInfoExercises = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 529px;
  justify-content: space-between;
`;

export const StyledBoxInfo = styled.div`
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
  padding-right: 10px;
`;

export const StyleBoxExercise = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  justify-content: space-between;
`;

export const StyleExerciseQuestion = styled.div`
  text-align: left;

  /* ГЛАВНОЕ ИЗМЕНЕНИЕ: разрешает автоматический перенос строк */
  white-space: pre-wrap;

  /* Если слово очень длинное, оно разорвется, чтобы влезть */
  word-break: break-word;

  /* Опционально: ограничь ширину, чтобы перенос был заметен */
  max-width: 400px;
`;

export const StyleExerciseInput = styled.input`
  width: 100%;
  height: 52px;

  gap: 10px;
  border-radius: 8px;
  border-width: 1px;
  padding-top: 16px;
  padding-right: 18px;
  padding-bottom: 16px;
  padding-left: 18px;
  margin-bottom: 20px;
`;
