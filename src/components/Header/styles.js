import styled from 'styled-components';

export const StyledLogoContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

export const StyledDescription = styled.article`
  font-weight: 400;
  font-style: Regular;
  font-size: 18px;
  color: #000000;
  opacity: 0.5;
  font-size: 18px;
`;

export const StyledLoginButton = styled.button`
  width: 103px;
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

export const StyledLogoImg = styled.img`
  width: 220px;
  height: 35px;
`;

export const StyledHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 60px;
`;
