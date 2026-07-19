import Rectangle from '../../assets/IconPhoto/Rectangle.svg';
import Icon from '../../assets/IconPhoto/Icon.svg';
import Ellipse from '../../assets/IconPhoto/Ellipse.svg';

import * as S from './styles';

export default function SkelitonIconUser() {
  return (
    <div>
      <S.StyledPhotoBox>
        <S.StyledProfilePhotoRectangle src={Rectangle} alt="Rectangle" />
        <S.StyledProfilePhotoIcon src={Icon} alt="Icon" />
        <S.StyledProfilePhotoEllipse src={Ellipse} alt="Ellipse" />
      </S.StyledPhotoBox>
    </div>
  );
}
