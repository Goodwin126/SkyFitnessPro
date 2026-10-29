import styled from 'styled-components';

export const StyledContentLessons = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLessonsContainer = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 40px; 
  justify-items: center;
}
`;

export const StyledButtonScrollBox = styled.div`
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    padding-top: 50px;
    justify-content: right;
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
