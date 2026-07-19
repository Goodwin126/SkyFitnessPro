import * as S from './styles';
import { useState } from 'react';

import calendar from '../../assets/calendar.svg';
import watch from '../../assets/watch.svg';
import signal_level from '../../assets/signal-level.svg';
import AddCircle from '../../assets/Add-in-Circle.svg';

export default function LessonItem({ lesson }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <S.StyledLessonItem key={lesson.id}>
      <S.StyledLink to={`/course/${lesson.name}`}>
        <S.StyledLessonImg src={lesson.imgLesson} alt="Activity" />
      </S.StyledLink>

      <S.StyledLessonAddButtonBox>
        <S.StyledLessonForTitleBox>
          <S.StyledLessonAddButton
            src={AddCircle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            alt="Add-activity"
          />

          {isHovered && (
            <S.StyledLessonTitle>Добавить курс</S.StyledLessonTitle>
          )}
        </S.StyledLessonForTitleBox>
      </S.StyledLessonAddButtonBox>

      <S.StyledLessonInfo>
        <S.StyledLink to={`/course/${lesson.name}`}>
          <S.StyledLessonName>{lesson.nameLesson}</S.StyledLessonName>
        </S.StyledLink>
        <S.StyledLessonInfoContainer>
          <S.StyledLessonInfoBox>
            <S.StyledLessonInfoIcon src={calendar} />
            <S.StyledLessonInfoText>
              {lesson.countDaysLesson}
            </S.StyledLessonInfoText>
          </S.StyledLessonInfoBox>
          <S.StyledLessonInfoBox>
            <S.StyledLessonInfoIcon src={watch} />
            <S.StyledLessonInfoText>
              {lesson.timeLesson} мин/день
            </S.StyledLessonInfoText>
          </S.StyledLessonInfoBox>
          <S.StyledLessonInfoBox>
            <S.StyledLessonInfoIcon src={signal_level} />
            <S.StyledLessonInfoText>Сложность</S.StyledLessonInfoText>
          </S.StyledLessonInfoBox>
        </S.StyledLessonInfoContainer>
      </S.StyledLessonInfo>
    </S.StyledLessonItem>
  );
}
