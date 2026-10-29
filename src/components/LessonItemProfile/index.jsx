import { memo } from 'react';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { shortenCourseName } from '../../utils/formatText';
import * as S from './styles';
import calendar from '../../assets/calendar.svg';
import watch from '../../assets/watch.svg';
import signal_level from '../../assets/signal-level.svg';
import iconMinus from '../../assets/Icon-minus.svg';

import { findFirstMissingWorkout } from '../../utils/workoutUtils';

import { openModal } from '../../store/uiSlice';
import {
  removeCourseOptimistic,
  restoreCourseOnError,
  deleteCousesByID,
} from '../../store/authSlice';
import {
  loadCousesByID,
  loadWorkoutVideoListByCourseID,
} from '../../store/coursesSlice';

const LessonItem = ({ course, userProgress }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---- STATES ----
  const [isHovered, setIsHovered] = useState(false);

  const userExercises = useSelector(
    state => state.auth.user?.userCourse[course.id]
  );

  // Вычисляем количество упражнений
  const countExs = course.workouts?.length ?? 0;

  const progressCourse = useMemo(() => {
    // 1. Проверяем: если прогресса нет (null или undefined) ИЛИ упражнений 0 -> возвращаем 0
    if (!userProgress || countExs === 0) {
      return 0;
    }

    const progressArray = Object.values(userProgress);

    // Защита на случай, если массив пустой (хотя countExs > 0, но прогресс пустой)
    if (progressArray.length === 0) {
      return 0;
    }

    // Используем reduce вместо map для суммирования (map тут лишний, он создает новый массив)
    let sum = progressArray.reduce((acc, item) => {
      // Дополнительная защита: вдруг item.percent не число?
      const percent = typeof item.percent === 'number' ? item.percent : 0;
      return acc + percent;
    }, 0);

    return Math.round((sum / countExs) * 10) / 10;
  }, [userProgress, countExs]);

  // ---- Delete course ----
  const handleClickDeleteCourse = async () => {
    await dispatch(deleteCousesByID(course.id)).unwrap();
    dispatch(removeCourseOptimistic(course.id));

    try {
      await dispatch(deleteCousesByID(course.id)).unwrap();
    } catch (error) {
      console.error('Ошибка удаления на сервере:', error);

      dispatch(restoreCourseOnError(course));
    }
  };

  const workouts = Object.fromEntries(course.workouts.map(id => [id, true]));

  const foundWorkout = findFirstMissingWorkout(workouts, userExercises);

  // ---- handle Modal Window ----
  const handleOpenWindowWorkoutVideo = () => {
    dispatch(loadWorkoutVideoListByCourseID(course.id));

    if (foundWorkout) {
      navigate(`/course/${course.id}/workout-video-page/${foundWorkout.id}`);
    }
  };

  const handlerClick = () => {
    dispatch(loadCousesByID(course.id));
    dispatch(openModal('CourseSelection'));
  };

  return (
    <S.StyledLessonItem key={course.id}>
      <S.StyledLessonImg
        src={course.listImage}
        alt="Activity"
        onClick={handlerClick}
      />

      <S.StyledLessonAddButtonBox>
        <S.StyledLessonForTitleBox>
          <S.StyledLessonAddButton
            src={iconMinus}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClickDeleteCourse}
            alt="Add-activity"
          />

          {isHovered && <S.StyledLessonTitle>Удалить курс</S.StyledLessonTitle>}
        </S.StyledLessonForTitleBox>
      </S.StyledLessonAddButtonBox>

      <S.StyledLessonInfo>
        <S.StyledLessonName>
          {shortenCourseName(course.nameRU)}
        </S.StyledLessonName>

        <S.StyledLessonInfoContainer>
          <S.StyledLessonInfoBox>
            <S.StyledLessonInfoIcon src={calendar} />
            <S.StyledLessonInfoText>
              {course.countDaysLesson}
            </S.StyledLessonInfoText>
          </S.StyledLessonInfoBox>

          <S.StyledLessonInfoBox>
            <S.StyledLessonInfoIcon src={watch} />
            <S.StyledLessonInfoText>
              {course.timeLesson} мин/день
            </S.StyledLessonInfoText>
          </S.StyledLessonInfoBox>

          <S.StyledLessonInfoBox>
            <S.StyledLessonInfoIcon src={signal_level} />
            <S.StyledLessonInfoText>Сложность</S.StyledLessonInfoText>
          </S.StyledLessonInfoBox>
        </S.StyledLessonInfoContainer>

        <S.StyledLessonProgress>
          <S.StyledLessonInfoProgress>
            Прогресс {progressCourse}%
          </S.StyledLessonInfoProgress>

          <S.StyledLessonProgressLine
            $progress={progressCourse}
            $color={S.PRIMARY_COLOR}
            aria-label="Прогресс воспроизведения"
          />
        </S.StyledLessonProgress>

        <S.StyledLessonButton onClick={handleOpenWindowWorkoutVideo}>
          Продолжить
        </S.StyledLessonButton>
      </S.StyledLessonInfo>
    </S.StyledLessonItem>
  );
};

export default memo(LessonItem);
