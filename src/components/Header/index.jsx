import logo from '../../assets/logo.svg';

import { Link } from 'react-router-dom';
import * as S from './styles';

export default function Header({ subtitle, handleClikeEnter }) {
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
      <S.StyledLoginButton onClick={handleClikeEnter}>
        Войти
      </S.StyledLoginButton>
    </S.StyledHeaderBox>
  );
}
