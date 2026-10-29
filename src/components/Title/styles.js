import styled from 'styled-components';

export const StyledTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;
  @media (max-width: 767px) {
    padding-bottom: 34px;
  }
`;

export const StyledTitle = styled.article`
  font-weight: 500;
  font-size: 60px;
  line-height: 1.1;

  @media (max-width: 767px) {
    font-size: 32px;
  }
`;

export const StyledSubtitleBox = styled.div`
  background-color: rgba(188, 236, 48, 1);
  padding-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 6px;
  line-height: 1.1;
`;
export const StyledSubtitleConteiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const StyledSubtitle = styled.article`
  font-weight: 400;
  font-style: Regular;
  font-size: 32px;
`;

export const StyledSubtitleImg = styled.img`
  width: 30px;
  height: 35px6;
  margin-top: -14px;
`;
