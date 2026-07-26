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

export const StyledProfileBox = styled.div`
  display: flex;
  padding: 30px;
  margin-top: 24px;
  position: absolute;
  top: 100%;
  right: 0;
  height: 258px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  flex-direction: column;
  align-items: center;
  gap: 34px;
`;

export const StyledBox = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const StyledText = styled.article`
  font-family: 'StratosSkyeng', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: ${({ color }) => color || 'black'}; /* если цвет не передан — будет чёрный */
`;

export const StyledBaseButton = styled.button`
  width: 206px;
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

export const StyledProfileButton = styled(StyledBaseButton)`
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

export const StyledLoginoutButton = styled(StyledBaseButton)`
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
