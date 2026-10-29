import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './styles';
import { shortenCourseName } from '../../utils/formatText';
import calendar from '../../assets/calendar.svg';
import watch from '../../assets/watch.svg';
import signal_level from '../../assets/signal-level.svg';
import AddCircle from '../../assets/Add-in-Circle.svg';

import { openModal } from '../../store/uiSlice';
import { addCousesByID } from '../../store/authSlice';
import { loadCousesByID } from '../../store/coursesSlice';

export default function LessonItem({ lesson }) {
  const userCourses = useSelector(state => state.auth.user?.userCourse);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handlerClickOpenCourseSelection = () => {
    dispatch(loadCousesByID(lesson.id));
    dispatch(openModal('CourseSelection'));
  };

  const handeClickAddCourse = () => {
    dispatch(addCousesByID(lesson.id));
  };
  return (
    <S.StyledLessonItem key={lesson.id}>
      {userCourses &&
      Object.prototype.hasOwnProperty.call(userCourses, lesson.id) ? (
        <div onClick={handlerClickOpenCourseSelection}>
          <S.StyledLessonImg src={lesson.listImage} alt="Activity" />
        </div>
      ) : (
        <S.StyledLink to={`/course/${lesson.id}`}>
          <S.StyledLessonImg src={lesson.listImage} alt="Activity" />
        </S.StyledLink>
      )}

      <S.StyledLessonAddButtonBox>
        <S.StyledLessonForTitleBox>
          <S.StyledLessonAddButton
            src={AddCircle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handeClickAddCourse}
            alt="Add-activity"
          />

          {isHovered && (
            <S.StyledLessonTitle>Добавить курс</S.StyledLessonTitle>
          )}
        </S.StyledLessonForTitleBox>
      </S.StyledLessonAddButtonBox>

      <S.StyledLessonInfo>
        <S.StyledLink to={`/course/${lesson.id}`}>
          <S.StyledLessonName>
            {shortenCourseName(lesson.nameRU)}
          </S.StyledLessonName>
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
