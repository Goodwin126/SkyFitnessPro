import { useDispatch, useSelector } from 'react-redux';
import * as S from './style';
import Header from '../../components/Header';
import SkelitonIconUser from '../../components/SkelitonIconUser';
import LessonItemProfile from '../../components/LessonItemProfile';

import ModalWindowLogin from '../../components/LoginWindow';
import { logout } from '../../store/authSlice';
import { selectUserCoursesWithProgress } from '../../store/selectors';
import { shallowEqual } from 'react-redux'; // 1. Импортируй

export function Profile() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const userCourses = useSelector(selectUserCoursesWithProgress, shallowEqual);

  const handleLoginOut = () => {
    localStorage.clear();
    dispatch(logout());
  };

  const displayName = user?.username ? user.username.split('@')[0] : 'Гость';
  const login = user?.username || 'Не авторизован';

  return (
    <>
      <Header />

      <S.StyledProfileContainer>
        {/* Блок профиля */}
        <S.StyledInfoBox>
          <S.StyledTitle>Профиль</S.StyledTitle>

          <S.StyledProfileInfo>
            <SkelitonIconUser />
            <S.StyledProfileTextBox>
              <S.StyledUserInfoName>{displayName}</S.StyledUserInfoName>
              <S.StyledUserInfoEnterBlok>
                <S.StyledUserInfoRow>
                  <S.StyledUserRow>Логин:</S.StyledUserRow>
                  <S.StyledUserRow>{login}</S.StyledUserRow>
                </S.StyledUserInfoRow>

                <S.StyledUserInfoRow>
                  <S.StyledUserRow>Пароль:</S.StyledUserRow>
                  <S.StyledUserRow>••••••••</S.StyledUserRow>
                </S.StyledUserInfoRow>
              </S.StyledUserInfoEnterBlok>

              <S.StyledButtonBox>
                <S.StyledChangePasswordButton>
                  Изменить пароль
                </S.StyledChangePasswordButton>
                <S.StyledExitButton onClick={handleLoginOut}>
                  Выйти
                </S.StyledExitButton>
              </S.StyledButtonBox>
            </S.StyledProfileTextBox>
          </S.StyledProfileInfo>
        </S.StyledInfoBox>

        {/* Блок курсов */}
        <S.StyledInfoBox>
          <S.StyledTitle>Мои курсы</S.StyledTitle>
          <S.StyledCourseInfo>
            {userCourses.length > 0 ? (
              userCourses.map(course => (
                <LessonItemProfile
                  key={course.id}
                  course={course}
                  userProgress={user?.courseProgress?.[course.id]}
                />
              ))
            ) : (
              <p>Пока нет доступных курсов...</p>
            )}
          </S.StyledCourseInfo>
        </S.StyledInfoBox>

        <S.StyledButtonScrollBox>
          <S.StyledButtonScroll
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Наверх ↑
          </S.StyledButtonScroll>
        </S.StyledButtonScrollBox>
      </S.StyledProfileContainer>

      {/* Модальное окно логина (если оно управляется через стор, возможно, здесь нужна проверка isOpen) */}
      <ModalWindowLogin />
    </>
  );
}
