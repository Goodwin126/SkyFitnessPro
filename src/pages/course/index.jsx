import * as S from './styles';
import sparcle from '../../assets/sparcle.svg';

import CourseBanner from '../../components/CourseBanner';
import Header from '../../components/Header';
import AdvertBanner from '../../components/AdvertBanner';
import ModalWindowLogin from '../../components/LoginWindow';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadCousesByID } from '../../store/coursesSlice';

export function Course() {
  const dispatch = useDispatch();
  const { id: nameCourse } = useParams();

  const currentCourse = useSelector(state => state.courses.current);
  const isLoading = useSelector(state => state.courses.isLoading);

  useEffect(() => {
    if (nameCourse) {
      dispatch(loadCousesByID(nameCourse));
    }
  }, [dispatch, nameCourse]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (isLoading) {
    return (
      <div>
        <Header subtitle={false} />
        <S.StyledCourseContent>
          <div
            style={{
              textAlign: 'center',
              marginTop: '50px',
              fontSize: '1.2rem',
              color: '#666',
            }}
          >
            🔄 Загрузка курса...
          </div>
        </S.StyledCourseContent>
        <ModalWindowLogin />
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div>
        <Header subtitle={false} />
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
          К сожалению, курс не найден
        </h2>
        <ModalWindowLogin />
      </div>
    );
  }

  return (
    <div>
      <Header subtitle={false} />

      <S.StyledCourseContent>
        <S.StyledCourseBox>
          <CourseBanner
            imageSrcCourse={currentCourse.detailImage}
            nameCourse={currentCourse.nameRU}
            colorCourse={currentCourse.color}
            bannerStyles={currentCourse.styles}
            bannerStylesforMobileVersion={currentCourse.stylesForMobileVersion}
          />

          <S.StyledInfoBlock>
            <S.StyledSubtitle>Подойдет для вас, если:</S.StyledSubtitle>
            <S.StyledContainerRecommends>
              {currentCourse.fitting.map((item, index) => (
                <S.StyledRecommendCard key={index}>
                  <S.StyledRecommenNumber>{index + 1}</S.StyledRecommenNumber>
                  <S.StyledRecommenText>{item}</S.StyledRecommenText>
                </S.StyledRecommendCard>
              ))}
            </S.StyledContainerRecommends>
          </S.StyledInfoBlock>

          <S.StyledInfoBlock>
            <S.StyledSubtitle>Направления</S.StyledSubtitle>
            <S.StyledContainerDirections>
              {currentCourse.directions.map((direction, index) => (
                <S.StyledDirectionItem key={index}>
                  <S.StyledDirectionImg src={sparcle} alt="Sparkle" />
                  <S.StyledDirectionText>{direction}</S.StyledDirectionText>
                </S.StyledDirectionItem>
              ))}
            </S.StyledContainerDirections>
          </S.StyledInfoBlock>
        </S.StyledCourseBox>

        <AdvertBanner />
      </S.StyledCourseContent>

      {/* Модальное окно рендерится всегда, вне зависимости от контента */}
      <ModalWindowLogin />
    </div>
  );
}
