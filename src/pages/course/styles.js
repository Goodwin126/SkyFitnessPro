import styled from 'styled-components';

export const StyledCourseContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 46px;
  gap: 102px;

  @media (max-width: 767px) {
    gap: 156px;
  }
`;

export const StyledCourseBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  @media (max-width: 767px) {
    gap: 40px;
  }
`;

export const StyledInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 767px) {
    gap: 24px;
  }
`;

export const StyledSubtitle = styled.h2`
  font-weight: 600;
  font-size: 40px;
  margin: 0;
  color: #333;

  @media (max-width: 767px) {
    font-weight: 500;
    font-size: 24px;
  }
`;

export const StyledContainerRecommends = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const StyledRecommendCard = styled.div`
  background-color: rgba(30, 33, 46, 1);
  padding: 20px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  flex: 1 1 auto;

  @media (max-width: 767px) {
    min-height: 141px;
    gap: 25px;
  }
`;

export const StyledRecommenNumber = styled.span`
  font-weight: 500;
  font-size: 75px;
  line-height: 1;
  color: rgba(188, 236, 48, 1);
  flex-shrink: 0;
`;

export const StyledRecommenText = styled.article`
  font-weight: 400;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
  flex-grow: 1;
  max-width: 100%;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

export const StyledContainerDirections = styled.div`
  background-color: rgba(188, 236, 48, 1);
  padding: 30px;
  border-radius: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledDirectionImg = styled.img`
  width: 24px;
  height: auto;
  display: block;
`;

export const StyledDirectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;

  @media (max-width: 767px) {
    gap: 8px;
  }
`;

export const StyledDirectionText = styled.article`
  font-weight: 400;
  font-size: 24px;
  color: #000;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;
