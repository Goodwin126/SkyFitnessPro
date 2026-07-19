import * as S from './styles';
import { useState } from 'react';

import calendar from '../../assets/calendar.svg';
import watch from '../../assets/watch.svg';
import signal_level from '../../assets/signal-level.svg';
import iconMinus from '../../assets/Icon-minus.svg';

export default function LessonItem({ lesson }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <S.StyledLessonItem key={lesson.id}>
      <S.StyledLessonImg src={lesson.imgLesson} alt="Activity" />

      <S.StyledLessonAddButtonBox>
        <S.StyledLessonForTitleBox>
          <S.StyledLessonAddButton
            src={iconMinus}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            alt="Add-activity"
          />

          {isHovered && <S.StyledLessonTitle>Удалить курс</S.StyledLessonTitle>}
        </S.StyledLessonForTitleBox>
      </S.StyledLessonAddButtonBox>

      <S.StyledLessonInfo>
        <S.StyledLessonName>{lesson.nameLesson}</S.StyledLessonName>
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
        <S.StyledLessonProgress>
          <S.StyledLessonInfoProgress>
            Прогресс {lesson.progress}%
          </S.StyledLessonInfoProgress>
          <S.StyledLessonProgressLine
            $progress={lesson.progress || 0}
            $color={S.PRIMARY_COLOR}
            aria-label="Прогресс воспроизведения"
          />
        </S.StyledLessonProgress>
        <S.StyledLessonButton>Продолжить</S.StyledLessonButton>
      </S.StyledLessonInfo>
    </S.StyledLessonItem>
  );
}
