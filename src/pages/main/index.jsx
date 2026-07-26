import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as S from './styles';
import logo from '../../assets/logo.svg';

import Header from '../../components/Header';
import Title from '../../components/Title';
import LessonItem from '../../components/LessonItem';

import { registerUser, loginUser } from '../../store/AuthSlice';
import { LessonList } from '../../data/coursesConfig';

export function Main() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 'Login', 'Registration' или null (если закрыто)
  const [isModeLogin, setIsModeLogin] = useState(null);

  // Состояние для отслеживания движения мыши
  const [mouseDownInWindow, setMouseDownInWindow] = useState(false);

  // Типы ошибок: 'password', 'login', 'used yet', или false (нет ошибки)
  const [errorType, setErrorType] = useState(false);

  // --- СОСТОЯНИЯ ФОРМ (для хранения данных из инпутов) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorType(false);
  };

  const handleClikeEnter = () => {
    setIsModalOpen(true);
    setIsModeLogin('Login');
    setErrorType(false);
  };

  // Обработчик нажатия ВНУТРИ окна
  const handleWindowMouseDown = () => {
    setMouseDownInWindow(true);
  };

  const handleOverlayMouseUp = () => {
    if (mouseDownInWindow) {
      setMouseDownInWindow(false);
      return;
    }
    closeModal();
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
      setIsModeLogin('Login');
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

      alert(`Добро пожаловать, ${email}!`);

      closeModal();
    } catch (err) {
      console.error('Ошибка входа:', err);

      if (err.status === 401 || err.status === 404) {
        setErrorType('password');
      } else {
        alert('Ошибка входа: ' + (err.data?.error || 'Неизвестная ошибка'));
      }
    }
  };

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header subtitle={true} handleClikeEnter={handleClikeEnter} />

        <S.StyledContentLessons>
          <Title />
          <S.StyledLessonsContainer>
            {LessonList.map(lesson => (
              <LessonItem key={lesson.id} lesson={lesson} />
            ))}
          </S.StyledLessonsContainer>
          <S.StyledButtonScrollBox>
            <S.StyledButtonScroll
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Наверх ↑
            </S.StyledButtonScroll>
          </S.StyledButtonScrollBox>
        </S.StyledContentLessons>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <S.StyledModalOverlay
          onMouseUp={handleOverlayMouseUp} // Ловим отпускание на фоне
          style={{ cursor: 'default' }}
        >
          <S.StyledModalWindow
            onMouseDown={handleWindowMouseDown} // Ловим нажатие внутри
            onClick={e => e.stopPropagation()} // Защита от всплытия клика
          >
            <S.StyledLogoImg src={logo} alt="Логотип" />

            {/* Блок регистрации */}
            {isModeLogin === 'Registration' && (
              <form onSubmit={handleRegister}>
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
                    onClick={() => setIsModeLogin('Login')}
                  >
                    Войти
                  </S.StyledButtonRegistration>
                </S.StyledButtonBox>
              </form>
            )}

            {/* Блок входа */}
            {isModeLogin === 'Login' && (
              <form onSubmit={handleLogin}>
                <S.StyledInfoBox>
                  <S.StyledInputInfoEnter
                    type="text"
                    placeholder="Логин"
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
                    onClick={() => setIsModeLogin('Registration')}
                  >
                    Зарегистрироваться
                  </S.StyledButtonRegistration>
                </S.StyledButtonBox>
              </form>
            )}
          </S.StyledModalWindow>
        </S.StyledModalOverlay>
      )}
    </>
  );
}
