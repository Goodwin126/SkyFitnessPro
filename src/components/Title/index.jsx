import * as S from './styles';
import triangle from '../../assets/triangle.svg';
export default function Title() {
  return (
    <div>
      <S.StyledTitleBox>
        <S.StyledTitleH2>
          Начните заниматься спортоми улучшите качество жизни
        </S.StyledTitleH2>
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
