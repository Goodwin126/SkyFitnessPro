import { useState } from 'react';

import * as S from './styles';
import logo from '../../assets/logo.svg';

import Header from '../../components/Header';
import Title from '../../components/Title';
import LessonItem from '../../components/LessonItem';

import { LessonList } from '../../data/coursesConfig';

export function Main() {
  //состояние открытости модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  //состояние входа: может быть "Login", "Registration" или null
  const [isModeLogin, setIsModeLogin] = useState(null);

  //состояние ошибки: может быть "password", "login" или "used yet"
  const [isError, setIsError] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const handleClikeEnter = () => {
    setIsModalOpen(true);
    setIsModeLogin('Login');
    setIsError('password');
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
      {/* Рендеринг модалки Reset password e-mail */}
      {isModalOpen && (
        <S.StyledModalOverlay onClick={closeModal}>
          <S.StyledModalWindow onClick={e => e.stopPropagation()}>
            <S.StyledLogoImg src={logo} alt="Логотип" />

            {isModeLogin === null && isError === false && (
              <S.StyledTextReset>
                Ссылка для востановления пароля отправлена на
                sergey.petrov96@mail.ru
              </S.StyledTextReset>
            )}

            {isModeLogin === 'Registration' && (
              <>
                <S.StyledInfoBox>
                  <S.StyledInputInfoEnter
                    type="email"
                    placeholder="Эл. почта"
                    required
                  />
                  <S.StyledInputInfoEnter
                    type="password"
                    placeholder="Пароль"
                    required
                  />
                  <S.StyledInputInfoEnter
                    type="password"
                    placeholder="Повторите пароль"
                    required
                  />
                  {isError === 'used yet' && (
                    <S.StyledTextError>
                      Данная почта уже используется. Попробуйте войти.
                    </S.StyledTextError>
                  )}
                </S.StyledInfoBox>
                <S.StyledButtonBox>
                  <S.StyledButtonEnter
                    onClick={() => alert('Форма отправлена!')}
                  >
                    Зарегистрироваться
                  </S.StyledButtonEnter>
                  <S.StyledButtonRegistration>Войти</S.StyledButtonRegistration>
                </S.StyledButtonBox>
              </>
            )}

            {isModeLogin === 'Login' && (
              <>
                <S.StyledInfoBox>
                  <S.StyledInputInfoEnter
                    type="email"
                    placeholder="Логин"
                    required
                    $hasError={isError === 'login'}
                  />
                  <S.StyledInputInfoEnter
                    type="password"
                    placeholder="Пароль"
                    required
                    $hasError={isError === 'password'}
                  />
                  {isError === 'password' && (
                    <S.StyledTextError>
                      Пароль введен неверно, попробуйте еще раз.{' '}
                      <a href="#">Восстановить пароль?</a>
                    </S.StyledTextError>
                  )}
                  {isError === 'login' && (
                    <S.StyledTextError>
                      Логин введен неверно, попробуйте еще раз.{' '}
                      <a href="#">Восстановить пароль?</a>
                    </S.StyledTextError>
                  )}
                </S.StyledInfoBox>

                <S.StyledButtonBox>
                  <S.StyledButtonEnter
                    onClick={() => alert('Форма отправлена!')}
                  >
                    Войти
                  </S.StyledButtonEnter>
                  <S.StyledButtonRegistration>
                    Зарегистрироваться
                  </S.StyledButtonRegistration>
                </S.StyledButtonBox>
              </>
            )}
          </S.StyledModalWindow>
        </S.StyledModalOverlay>
      )}
    </>
  );
}
