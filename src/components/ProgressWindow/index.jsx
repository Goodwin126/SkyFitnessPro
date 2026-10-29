import * as S from './styles';
import { splitByBracket } from '../../utils/bracketSearch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCourseById } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';

import {
  updateProgressWorkoutVideo,
  applyServerProgress,
  rollbackProgressOptimistic,
} from '../../store/authSlice';

import { closeModal } from '../../store/uiSlice';

export default function ModalWindowProgress({ exercisesWithProgress }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Params ---
  const { courseId, id: workoutId } = useParams();

  // ✅ ДОБАВЬ ЭТИ СТРОКИ ДЛЯ ДИАГНОСТИКИ:

  // --- STATES ---
  const [mouseDownInWindow, setMouseDownInWindow] = useState(false);
  const [progressValues, setProgressValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // --- SELECTORS ---
  const modalWindow = useSelector(state => state.ui?.modalWindow.modalOpen);
  const modeLogin = useSelector(state => state.ui?.modalWindow.modeLogin);

  // --- HOOKS---
  const course = useCourseById(courseId);

  // ---- ОБРАБОТЧИК МОДАЛЬНОГО ОКНА ----

  const handleWindowMouseDown = () => {
    setMouseDownInWindow(true);
  };

  const handleOverlayMouseUp = () => {
    if (mouseDownInWindow) {
      setMouseDownInWindow(false);
      return;
    }
    dispatch(closeModal());
    setMouseDownInWindow(false);
  };

  // ---- ОБРАБОТЧИК ОТПРАВКИ ПРОГРЕССА ----

  const handleSave = async () => {
    setIsSaving(true);

    const exercisesPayload = exercisesWithProgress.map((exercise, index) => {
      const userInput = progressValues[index];

      const quantity =
        userInput !== undefined
          ? parseInt(userInput, 10) || 0
          : exercise.currentQty || 0;

      return {
        index,
        name: exercise.name,
        quantity,
      };
    });

    const payload = {
      courseId: courseId,
      workoutId: workoutId,
      exercises: exercisesPayload,
    };

    // Сохраняем старые значения для возможного отката (rollback)
    const oldExercises = exercisesWithProgress.map(ex => ({
      index: ex.index || exercisesWithProgress.indexOf(ex),
      name: ex.name,
      quantity: ex.quantity,
    }));

    try {
      const result = await dispatch(
        updateProgressWorkoutVideo(payload)
      ).unwrap();

      dispatch(
        applyServerProgress({
          courseId,
          workoutId,
          data: result,
        })
      );
      dispatch(closeModal());
      setIsSaving(false);
    } catch (error) {
      console.error(error);
      // Откат оптимистичных изменений
      dispatch(
        rollbackProgressOptimistic({ courseId, workoutId, oldExercises })
      );
    }

    const workouts = course.workouts;

    const nextWorkoutId = workouts[workouts.indexOf(workoutId) + 1];

    if (nextWorkoutId) {
      navigate(`/course/${courseId}/workout-video-page/${nextWorkoutId}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <>
      {/* Модальное окно */}
      {modalWindow && (
        <S.StyledModalOverlay
          onMouseUp={handleOverlayMouseUp} // Ловим отпускание на фоне
          style={{ cursor: 'default' }}
        >
          <S.StyledModalWindow
            onMouseDown={handleWindowMouseDown} // Ловим нажатие внутри
            onClick={e => e.stopPropagation()} // Защита от всплытия клика
            $isCourseSelection={modeLogin === 'CourseSelection'}
          >
            {/* --- БЛОК ввода прогресса --- */}
            {modeLogin === 'Progress' && (
              <S.StyleBoxInfoExercises>
                <S.StyledTextH2>Мой прогресс</S.StyledTextH2>

                <S.StyledBoxInfo>
                  {exercisesWithProgress.length !== 0 ? (
                    exercisesWithProgress.map((exercise, index) => {
                      const { main, bracket } = splitByBracket(exercise.name);
                      return (
                        <S.StyleBoxExercise key={index}>
                          <S.StyleExerciseQuestion>
                            <span>Сколько раз вы сделали: </span>
                            <span>{main}</span>
                            {bracket && (
                              <span
                                style={{
                                  display: 'block',
                                }}
                              >
                                {bracket}
                                <span>?</span>
                              </span>
                            )}
                          </S.StyleExerciseQuestion>
                          <S.StyleExerciseInput
                            type="number"
                            value={progressValues[index] ?? 0}
                            onChange={e => {
                              const value = e.target.value;
                              setProgressValues(prev => ({
                                ...prev,
                                [index]: value,
                              }));
                            }}
                            placeholder="0"
                            min="0"
                          />
                        </S.StyleBoxExercise>
                      );
                    })
                  ) : (
                    <>Тут могла быть ваша реклама!</>
                  )}
                </S.StyledBoxInfo>

                <S.StyledButtonEnter onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Сохранение...' : 'Сохранить'}
                </S.StyledButtonEnter>
              </S.StyleBoxInfoExercises>
            )}
          </S.StyledModalWindow>
        </S.StyledModalOverlay>
      )}
    </>
  );
}
