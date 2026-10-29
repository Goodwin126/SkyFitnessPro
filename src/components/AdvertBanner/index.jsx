import athlete from '../../assets/athlete.png';
import vector from '../../assets/Vector.svg';
import vector2 from '../../assets/Vector2.png';
import vector3 from '../../assets/Vector3.png';
import * as S from './styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCousesByID } from '../../store/authSlice';

export default function AdvertBanner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const curentCourse = useSelector(state => state.courses?.current);

  const handeClickAddCourse = () => {
    dispatch(addCousesByID(curentCourse.id));
    navigate(`/`);
  };
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
        <S.StyledAdvBtb onClick={handeClickAddCourse}>
          Добавить курс
        </S.StyledAdvBtb>
      </S.StyledAdvertBannerInfo>
      <S.StyledAdvertVectorImgBox>
        <S.StyledAdvertVectorImg src={vector} alt="Vector 1" />
      </S.StyledAdvertVectorImgBox>
      <S.StyledAdvertVector2Img src={vector2} alt="Vector 2" />
      <S.StyledAdvertVector2MFImg src={vector3} alt="Vector 3" />
      <S.StyledAdvertAthleteImg src={athlete} alt="Athlete" />
    </S.StyledAdvertBanner>
  );
}
