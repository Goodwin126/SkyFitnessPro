import styled from 'styled-components';

export const PRIMARY_COLOR = 'rgba(0, 193, 255, 1)';

export const StyledLessonProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const StyledLessonInfoProgress = styled.span`
  font-weight: 400;
  font-style: Regular;
  font-size: 18px;
`;

export const BaseButton = styled.button`
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

export const StyledLessonItem = styled.div`
  position: relative;
  width: 360px;
  height: 649px;
  border-radius: 30px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
`;
export const StyledLessonImg = styled.img`
  width: 360px;
  height: 325px;
  object-fit: cover;
  border-radius: 30px;
  display: block;
`;

export const StyledLessonAddButtonBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const StyledLessonAddButton = styled.img`
  cursor:
    url('../../assets/cursor-arrow.png') 16 16,
    pointer;
  width: 32px;
  height: 32px;
`;

export const StyledLessonForTitleBox = styled.div`
  position: relative;
  display: inline-flex;
  alignitems: center;
`;

export const StyledLessonTitle = styled.div`
  border-color: #000000;
  border: 1px solid #000000;
  position: absolute;
  top: 44px;
  left: 84px;
  transform: translateX(-50%);
  background-color: #ffffff;
  color: #000000;
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: auto;
  z-index: 9999;
`;

export const StyledLessonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 24px;
  padding-left: 30px;
  padding-right: 30px;
`;
export const StyledLessonName = styled.h2`
  font-weight: 500;
  font-style: Medium;
  font-size: 32px;
`;

export const StyledLessonInfoBox = styled.div`
  display: flex;
  gap: 6px;
  background-color: rgb(247, 247, 247);
  border-radius: 16px;
  padding-top: 7px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 7px;
  align-items: center;
`;

export const StyledLessonInfoIcon = styled.img`
  width: 18px;
  height: 18px;
`;
export const StyledLessonInfoText = styled.article`
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
`;

export const StyledLessonInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
