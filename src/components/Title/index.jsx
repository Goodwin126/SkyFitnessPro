import * as S from './styles';
import triangle from '../../assets/triangle.svg';
export default function Title() {
  return (
    <div>
      <S.StyledTitleBox>
        <S.StyledTitle>
          Начните заниматься спортоми улучшите качество жизни
        </S.StyledTitle>
        <S.StyledSubtitleConteiner>
          <S.StyledSubtitleBox>
            <S.StyledSubtitle>Измени своё тело за полгода!</S.StyledSubtitle>
          </S.StyledSubtitleBox>
          <S.StyledSubtitleImg src={triangle} />
        </S.StyledSubtitleConteiner>
      </S.StyledTitleBox>
    </div>
  );
}
