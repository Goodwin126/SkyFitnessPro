import logo from '../../assets/logo.svg';
import arrow from '../../assets/arrow.svg';
import * as S from './styles';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import profile from '../../assets/Profile.svg';

export default function Header({ subtitle, handleClikeEnter }) {
  const [openWindowProfile, setOpenWindowProfile] = useState(false);
  const user = useSelector(state => state.storage?.user) || {};
  const username = user.username;

  const handlerClick = () => {
    if (openWindowProfile) {
      setOpenWindowProfile(false);
    } else {
      setOpenWindowProfile(true);
    }
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
      {username !== null ? (
        <div
          className="flex items-center relative group [height:50px] [justify-content:flex-end] "
          onClick={handlerClick}
        >
          <img
            src={profile}
            alt="icon-profile"
            className="[width:50px] [height:50px] pr-[16px]"
          />
          <article className="[font-weight:400] [font-size:24px] pr-[12px]">
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
                <S.StyledLoginoutButton>Выйти</S.StyledLoginoutButton>
              </S.StyledBox>
            </S.StyledProfileBox>
          ) : null}
        </div>
      ) : (
        <S.StyledLoginButton onClick={handleClikeEnter}>
          {username !== null ? username : <span>Войти</span>}
        </S.StyledLoginButton>
      )}
    </S.StyledHeaderBox>
  );
}
