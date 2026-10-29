import logo from '../../assets/logo.svg';
import arrow from '../../assets/arrow.svg';
import * as S from './styles';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import profile from '../../assets/Profile.svg';

import { openModal } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';

export default function Header({ subtitle }) {
  const dispatch = useDispatch();
  const [openWindowProfile, setOpenWindowProfile] = useState(false);
  const user = useSelector(state => state.auth?.user) || {};

  const username = user.username;

  const handlerClick = () => {
    if (openWindowProfile) {
      setOpenWindowProfile(false);
    } else {
      setOpenWindowProfile(true);
    }
  };

  const handleClikeEnter = () => {
    dispatch(openModal('Login'));
  };

  const handleClikeOut = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <S.StyledHeaderBox>
      <S.StyledLogoContainer>
        <Link to="/">
          <S.StyledLogoImg src={logo} alt="Логотип" />
        </Link>

        {subtitle && (
          <S.StyledDescription>
            Онлайн-тренировки для занятий дома
          </S.StyledDescription>
        )}
      </S.StyledLogoContainer>
      {username ? (
        <div
          className="flex items-center relative group [height:50px] [justify-content:flex-end] "
          onClick={handlerClick}
        >
          <img
            src={profile}
            alt="icon-profile"
            className="[width:50px] [height:50px] pr-[16px]"
          />
          <article className="hidden md:block font-normal text-[24px] pr-[12px]">
            {username}
          </article>
          <img src={arrow} alt="icon-arrow" className="w-2 h-2" />

          {openWindowProfile ? (
            <S.StyledProfileBox>
              <S.StyledBox>
                <S.StyledText>{username}</S.StyledText>
                <S.StyledText color="rgba(153, 153, 153, 1)">
                  {username}
                </S.StyledText>
              </S.StyledBox>

              <S.StyledBox>
                <Link to="/profile">
                  <S.StyledProfileButton>Мой профиль</S.StyledProfileButton>
                </Link>
                <S.StyledLoginoutButton onClick={handleClikeOut}>
                  Выйти
                </S.StyledLoginoutButton>
              </S.StyledBox>
            </S.StyledProfileBox>
          ) : null}
        </div>
      ) : (
        <S.StyledLoginButton onClick={handleClikeEnter}>
          {username ? username : <span>Войти</span>}
        </S.StyledLoginButton>
      )}
    </S.StyledHeaderBox>
  );
}
