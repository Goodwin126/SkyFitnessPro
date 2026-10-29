import logo from '../../assets/logo.svg';
import iconComplited from '../../assets/icons-completed/completed-icon.svg';
import iconUncomplited from '../../assets/icons-completed/uncompleted-icon.svg';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { findFirstMissingWorkout } from '../../utils/workoutUtils';

import { closeModal, setErrorType, toggleMode } from '../../store/uiSlice';
import { loadWorkoutVideoListByCourseID } from '../../store/coursesSlice';
import { registerUser, loginUser } from '../../store/AuthSlice';

export default function ModalWindowLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- SELECTORS ---
  //модальное окно
  const modalWindow = useSelector(state => state.ui?.modalWindow.modalOpen);
  const modeLogin = useSelector(state => state.ui?.modalWindow.modeLogin);
  const errorType = useSelector(state => state.ui?.modalWindow.errorType);

  // курсы пользователя
  const userCourses = useSelector(state => state.auth.user?.userCourse);
  // выбранные курс
  const currentCourse = useSelector(state => state.courses?.current?.id);
  //объект выбранных упражений по курсу
  const workouts = useSelector(
    state => state.courses?.currentWorkoutVideoList?.workouts
  );

  // Состояние для отслеживания движения мыши
  const [mouseDownInWindow, setMouseDownInWindow] = useState(false);

  // --- СОСТОЯНИЯ ФОРМ (для хранения данных из инпутов) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Обработчик нажатия ВНУТРИ окна
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

  // --- ЛОГИКА РЕГИСТРАЦИИ ---
  const handleRegister = async e => {
    e.preventDefault();
    setErrorType(false);

    if (password !== confirmPassword) {
      setErrorType('password');
      return;
    }

    try {
      await dispatch(
        registerUser({
          email: email,
          password: password,
          username: email,
        })
      ).unwrap();

      alert('Регистрация успешна! Теперь войдите.');
      dispatch(toggleMode('Login'));
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);

      if (err.status === 409) {
        setErrorType('used yet');
      } else if (err.status === 400) {
        setErrorType(err.data?.message || 'Ошибка валидации данных');
      } else {
        alert('Ошибка регистрации: ' + (err.message || 'Неизвестная ошибка'));
      }
    }
  };

  // --- ЛОГИКА ВХОДА ---
  const handleLogin = async e => {
    e.preventDefault();
    setErrorType(false);

    try {
      await dispatch(
        loginUser({
          email: email,
          password: password,
        })
      ).unwrap();

      dispatch(closeModal());
    } catch (err) {
      console.error('Ошибка входа:', err);

      if (err.status === 401 || err.status === 404) {
        setErrorType('password');
      } else {
        alert('Ошибка входа: ' + (err.data?.error || 'Неизвестная ошибка'));
      }
    }
  };

  const currentWorkoutVideoList = useSelector(
    state => state.courses?.currentWorkoutVideoList
  );

  // --- ЛОГИКА ЗАГРУЗКИ ДАННЫХ ---
  const userExercises = useMemo(() => {
    if (!userCourses || !currentCourse) return {};

    const exercises = userCourses[currentCourse];

    return exercises || {};
  }, [userCourses, currentCourse]);

  useEffect(() => {
    if (modeLogin === 'CourseSelection') {
      if (currentCourse) {
        dispatch(loadWorkoutVideoListByCourseID(currentCourse));
      }
    }
  }, [dispatch, currentCourse, modeLogin]);

  const isLoading =
    !currentCourse ||
    !currentWorkoutVideoList ||
    currentWorkoutVideoList.courseId !== currentCourse;

  const workoutsList = useMemo(() => {
    if (isLoading || !workouts || modeLogin !== 'CourseSelection') {
      return [];
    }

    const safeUserExercises = userExercises || {};

    return Object.entries(workouts).map(([id, name]) => ({
      id,
      name,
      completed: !!safeUserExercises[id],
    }));
  }, [workouts, userExercises, modeLogin, isLoading]);

  // --- СОБИРАЕМ АДРЕС ДЛЯ ЗАГРУЗКИ ---

  const foundWorkout = useMemo(() => {
    if (isLoading || modeLogin !== 'CourseSelection') {
      return null;
    }

    // Вызываем утилиту только с данными
    return findFirstMissingWorkout(workouts, userExercises);
  }, [workouts, userExercises, modeLogin, isLoading]);

  const handleClikcItem = item => {
    navigate(`/course/${currentCourse}/workout-video-page/${item.id}`);
    dispatch(closeModal());
  };

  const handleClikcStart = () => {
    navigate(`/course/${currentCourse}/workout-video-page/${foundWorkout.id}`);
    dispatch(closeModal());
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
            {/* ---  Блок регистрации  --- */}
            {modeLogin === 'Registration' && (
              <form onSubmit={handleRegister}>
                <S.StyledLogoImg src={logo} alt="Логотип" />
                <S.StyledInfoBox>
                  <S.StyledInputInfoEnter
                    type="email"
                    placeholder="Эл. почта"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <S.StyledInputInfoEnter
                    type="password"
                    placeholder="Пароль"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <S.StyledInputInfoEnter
                    type="password"
                    placeholder="Повторите пароль"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />

                  {errorType === 'used yet' && (
                    <S.StyledTextError>
                      Такой пользователь уже существует. Попробуйте войти.
                    </S.StyledTextError>
                  )}
                </S.StyledInfoBox>

                <S.StyledButtonBox>
                  <S.StyledButtonEnter type="submit">
                    Зарегистрироваться
                  </S.StyledButtonEnter>
                  <S.StyledButtonRegistration
                    onClick={() => dispatch(toggleMode('Login'))}
                  >
                    Войти
                  </S.StyledButtonRegistration>
                </S.StyledButtonBox>
              </form>
            )}

            {/* ---  Блок входа  --- */}
            {modeLogin === 'Login' && (
              <form onSubmit={handleLogin}>
                <S.StyledLogoImg src={logo} alt="Логотип" />
                <S.StyledInfoBox>
                  <S.StyledInputInfoEnter
                    type="text"
                    placeholder="Эл. почта"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    $hasError={errorType === 'login'}
                  />
                  <S.StyledInputInfoEnter
                    type="password"
                    placeholder="Пароль"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    $hasError={errorType === 'password'}
                  />

                  {(errorType === 'password' || errorType === 'login') && (
                    <S.StyledTextError>
                      Неверный логин или пароль. Попробуйте еще раз.{' '}
                      <a href="#">Восстановить пароль?</a>
                    </S.StyledTextError>
                  )}
                </S.StyledInfoBox>

                <S.StyledButtonBox>
                  <S.StyledButtonEnter type="submit">Войти</S.StyledButtonEnter>
                  <S.StyledButtonRegistration
                    onClick={() => dispatch(toggleMode('Registration'))}
                  >
                    Зарегистрироваться
                  </S.StyledButtonRegistration>
                </S.StyledButtonBox>
              </form>
            )}

            {/* ---  БЛОК тренировок --- */}
            {modeLogin === 'CourseSelection' && (
              <S.StyleBoxInfoExercises>
                <S.StyledTextH2>Выберите тренировку</S.StyledTextH2>

                {/* 1. Если курс есть, но грузится */}
                {currentCourse && isLoading && (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    ⏳ Загрузка тренировок для курса...
                  </div>
                )}

                {/* 2. Если загрузилось и список не пустой */}
                {currentCourse && !isLoading && workoutsList.length > 0 && (
                  <>
                    <S.StyledWorkoutList>
                      {workoutsList.map(item => {
                        const parts = item.name.split('/');
                        return (
                          <S.StyledItemLi key={item.id}>
                            <S.StyledIconComplited
                              src={
                                item.completed ? iconComplited : iconUncomplited
                              }
                              alt="status"
                            />

                            <S.StyledTextItemBox>
                              <S.StyledWorkoutLink
                                onClick={() => {
                                  handleClikcItem(item);
                                }}
                              >
                                <S.StyledBigText>
                                  {parts[0].trim()}
                                </S.StyledBigText>
                                {parts.slice(1).length > 0 && (
                                  <S.StyledSmallText>
                                    {parts.slice(1).join('/').trim()}
                                  </S.StyledSmallText>
                                )}
                              </S.StyledWorkoutLink>
                            </S.StyledTextItemBox>
                          </S.StyledItemLi>
                        );
                      })}
                    </S.StyledWorkoutList>

                    {/* 3. КНОПКА: Безопасная проверка перед использованием .id */}
                    <S.StyledButtonBox>
                      {foundWorkout ? (
                        <S.StyledButtonEnter onClick={handleClikcStart}>
                          Начать
                        </S.StyledButtonEnter>
                      ) : (
                        <S.StyledButtonEnter
                          disabled
                          style={{ opacity: 0.6, cursor: 'not-allowed' }}
                        >
                          {isLoading
                            ? 'Загрузка...'
                            : 'Все тренировки завершены'}
                        </S.StyledButtonEnter>
                      )}
                    </S.StyledButtonBox>
                  </>
                )}

                {/* 4. Если загрузилось, но список пустой */}
                {currentCourse && !isLoading && workoutsList.length === 0 && (
                  <p style={{ color: '#666' }}>
                    В этом курсе пока нет тренировок.
                  </p>
                )}
              </S.StyleBoxInfoExercises>
            )}
          </S.StyledModalWindow>
        </S.StyledModalOverlay>
      )}
    </>
  );
}
