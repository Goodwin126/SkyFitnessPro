import styled from 'styled-components';

export const PRIMARY_COLOR = 'rgba(0, 193, 255, 1)';

export const StyledContetntBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled.h2`
  font-weight: 500;
  font-style: Medium;
  font-size: 60px;
  margin-bottom: 24px;
  @media (max-width: 767px) {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

export const StyledpathLessons = styled.h3`
  font-weight: 400;
  font-style: Regular;
  font-size: 32px;
  margin-bottom: 40px;

  @media (max-width: 767px) {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 24px;
  }
`;

export const StyledLink = styled.a`
  color: black;
`;

export const StyledVideo = styled.iframe`
  width: 100%;
  height: 639px;
  border-radius: 30px;
`;

export const StyledLessonProgressLine = styled.div`
  --progress-height: 6px;

  --progress-color: ${props => props.$color ?? PRIMARY_COLOR};
  width: 100%;
  height: var(--progress-height);

  background-color: rgba(247, 247, 247, 1);
  border-radius: 50px;

  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: ${props => `${props.$progress}%`};
    height: 100%;

    background-color: var(--progress-color);

    border-radius: 50px;
  }
`;

export const StyledInfoBox = styled.div`
  margin-top: 40px;
  margin-bottom: 151px;
  padding: 40px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);

  @media (max-width: 767px) {
    margin-top: 24px;
    padding: 30px;
  }
`;

export const StyledNameLesson = styled.h3`
  margin-bottom: 20px;
  font-family: 'StratosSkyeng', sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: 0.02em;
`;

export const StyleProgressBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 60px;

  @media (max-width: 767px) {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
`;

export const BaseButton = styled.button`
  margin-top: 40px;
  width: 320px;
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

export const StyledLessonButton = styled(BaseButton)`
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

export const StyleProgressItem = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-between;
}`;

export const StyleProgressName = styled.p`
  font-weight: 400;
  font-size: 18px;
`;
