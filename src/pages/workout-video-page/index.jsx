import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';

import Header from '../../components/Header';
import ModalWindowProgress from '../../components/ProgressWindow';
import * as S from './styles';

import { loadWorkoutVideoByID } from '../../store/coursesSlice';
import { calculateExerciseProgress } from '../../utils/calculateProgress';
import { openModal } from '../../store/uiSlice';

export function WorkoutVideo() {
  const dispatch = useDispatch();
  const { courseId, id: workoutId } = useParams();

  // --- SELECTORS ---
  const courses = useSelector(state => state.courses?.list);
  const currentWorkout = useSelector(
    state => state.courses?.currentWorkoutVideo || null
  );

  const foundCourse = useSelector(
    state => state.auth.user?.userCourse[courseId] ?? {}
  );

  // Безопасное получение массива
  const userExercises = useMemo(() => {
    // Если ключа нет или это не массив - возвращаем пустой массив
    const raw = foundCourse[workoutId];
    return Array.isArray(raw) ? raw : [];
  }, [foundCourse, workoutId]);

  const exercisesWithProgress = useMemo(() => {
    const workouts = currentWorkout?.exercises || [];

    console.log('workouts = ', workouts);

    if (!Array.isArray(workouts)) return [];

    return calculateExerciseProgress(workouts, userExercises);
  }, [currentWorkout, userExercises]);

  useEffect(() => {
    dispatch(loadWorkoutVideoByID(workoutId));
  }, [dispatch, workoutId]);

  const handleCompleteProgress = () => {
    dispatch(openModal('Progress'));
  };

  const course = courses.find(item => item.id === courseId);

  if (!currentWorkout) {
    return <div style={{ padding: 20 }}>Загрузка урока...</div>;
  }

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header subtitle={false} />

        <S.StyledContetntBox>
          <S.StyledTitle>
            {course ? course.nameRU : 'Загрузка курса...'}
          </S.StyledTitle>

          <S.StyledpathLessons>
            <S.StyledLink href="#">{currentWorkout.name}</S.StyledLink>
          </S.StyledpathLessons>

          {/* Адаптивное видео - теперь безопасно */}
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
            }}
          >
            <S.StyledVideo
              src={currentWorkout.video || ''} // Защита от null
              title={course?.nameRU || 'Урок'} // Защита от null
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </S.StyledContetntBox>

        <S.StyledInfoBox>
          <S.StyledNameLesson>{currentWorkout.name}</S.StyledNameLesson>

          <S.StyleProgressBox>
            {exercisesWithProgress.map((task, index) => {
              // Защита на случай, если task вдруг null
              if (!task) return null;
              return (
                <S.StyleProgressItem key={`${index}-${task.name}`}>
                  <S.StyleProgressName>
                    {task.name}
                    <span> {task.percent}%</span>
                  </S.StyleProgressName>

                  <S.StyledLessonProgressLine
                    $progress={task.percent}
                    $color={S.PRIMARY_COLOR}
                    aria-label={`Прогресс: ${task.name} - ${task.percent}`}
                  />
                </S.StyleProgressItem>
              );
            })}
          </S.StyleProgressBox>

          <S.StyledLessonButton onClick={handleCompleteProgress}>
            Заполнить свой прогресс
          </S.StyledLessonButton>
        </S.StyledInfoBox>
      </div>

      {/* Передаем данные только если они есть */}
      <ModalWindowProgress exercisesWithProgress={exercisesWithProgress} />
    </>
  );
}
