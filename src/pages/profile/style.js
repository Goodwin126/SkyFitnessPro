import styled from 'styled-components';

export const StyledProfileContainer = styled.div`
  display: flex;
  gap: 60px;
  flex-direction: column;
`;

export const StyledInfoBox = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
`;

export const StyledTitle = styled.h2`
  margin: 0;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 40px;
`;

export const StyledProfileInfo = styled.div`
  display: flex;
  align-items: center;
  height: 257px;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  background-color: #fff;
  gap: 33px;
`;

export const StyledProfileTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const StyledUserInfoName = styled.h3`
  font-weight: 500;
  font-style: Medium;
  font-size: 32px;
`;

export const StyledUserInfoRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 3px;
`;

export const StyledUserRow = styled.span`
  font-weight: 400;
  font-style: Regular;
  font-size: 18px;
  color: #000000;
`;

export const StyledButtonBox = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const StyledBaseButton = styled.button`
  width: 192px;
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

export const StyledChangePasswordButton = styled(StyledBaseButton)`
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

export const StyledExitButton = styled(StyledBaseButton)`
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

export const StyledCourseInfo = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;
