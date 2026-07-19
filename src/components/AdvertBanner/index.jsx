import athlete from '../../assets/athlete.png';
import vector from '../../assets/Vector.svg';
import vector2 from '../../assets/Vector2.png';
import * as S from './styles';

export default function AdvertBanner() {
  return (
    <S.StyledAdvertBanner>
      <S.StyledAdvertBannerInfo>
        <S.StyledAdvertBannerTitle>
          Начните путь к новому телу
        </S.StyledAdvertBannerTitle>

        <S.StyledAdvList>
          <S.StyledAdvListItem>проработка всех групп мышц</S.StyledAdvListItem>
          <S.StyledAdvListItem>тренировка суставов</S.StyledAdvListItem>
          <S.StyledAdvListItem>улучшение циркуляции крови</S.StyledAdvListItem>
          <S.StyledAdvListItem>
            упражнения заряжают бодростью
          </S.StyledAdvListItem>
          <S.StyledAdvListItem>
            помогают противостоять стрессам
          </S.StyledAdvListItem>
        </S.StyledAdvList>
        <S.StyledAdvBtb>Добавить курс</S.StyledAdvBtb>
      </S.StyledAdvertBannerInfo>
      <S.StyledAdvertVectorImgBox>
        <S.StyledAdvertVectorImg src={vector} alt="Vector 1" />
      </S.StyledAdvertVectorImgBox>

      <S.StyledAdvertVector2Img src={vector2} alt="Vector 2" />

      <S.StyledAdvertAthleteImg src={athlete} alt="Athlete" />
    </S.StyledAdvertBanner>
  );
}
