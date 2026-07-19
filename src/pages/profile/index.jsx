import { useState } from 'react';

import * as S from './style';

import Header from '../../components/Header';
import SkelitonIconUser from '../../components/SkelitonIconUser';
import LessonItemProfile from '../../components/LessonItemProfile';

import { LessonListProfile } from '../../data/coursesConfig';

export function Profile() {
  const [user] = useState({
    name: 'Ivan',
    login: 'Ivan45',
    password: 'Ribamesh',
  });

  return (
    <>
      <Header />

      <S.StyledProfileContainer>
        <S.StyledInfoBox>
          <S.StyledTitle>Профиль</S.StyledTitle>

          <S.StyledProfileInfo>
            <SkelitonIconUser />
            <S.StyledProfileTextBox>
              <S.StyledUserInfoName>{user.name}</S.StyledUserInfoName>

              <S.StyledUserInfoRow>
                <S.StyledUserRow>Логин:</S.StyledUserRow>
                <S.StyledUserRow>{user.login}</S.StyledUserRow>
              </S.StyledUserInfoRow>

              <S.StyledUserInfoRow>
                <S.StyledUserRow>Пароль: </S.StyledUserRow>
                <S.StyledUserRow> ••••••••</S.StyledUserRow>
              </S.StyledUserInfoRow>

              <S.StyledButtonBox>
                <S.StyledChangePasswordButton>
                  Изменить пароль
                </S.StyledChangePasswordButton>
                <S.StyledExitButton>Выйти</S.StyledExitButton>
              </S.StyledButtonBox>
            </S.StyledProfileTextBox>
          </S.StyledProfileInfo>
        </S.StyledInfoBox>
        <S.StyledInfoBox>
          <S.StyledTitle>Мои курсы</S.StyledTitle>
          <S.StyledCourseInfo>
            {LessonListProfile ? (
              LessonListProfile.map(lesson => (
                <LessonItemProfile key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <p>Пока нет уроков...</p>
            )}
          </S.StyledCourseInfo>
        </S.StyledInfoBox>
      </S.StyledProfileContainer>
    </>
  );
}
