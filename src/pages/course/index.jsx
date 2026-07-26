import * as S from './styles';
import sparcle from '../../assets/sparcle.svg';

import CourseBanner from '../../components/CourseBanner';
import Header from '../../components/Header';
import AdvertBanner from '../../components/AdvertBanner';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { COURSES } from '../../data/coursesConfig';

export function Course() {
  // Получаем id из URL
  const { id: nameCourse } = useParams();

  const currentCourse = COURSES[nameCourse];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!currentCourse) {
    return <div>Курс не найден</div>;
  }

  return (
    <div>
      <Header subtitle={false} />

      <S.StyledCourseContent>
        <S.StyledCourseBox>
          <CourseBanner
            imageSrcCourse={currentCourse.src}
            nameCourse={currentCourse.name}
            colorCourse={currentCourse.color}
            bannerStyles={currentCourse.styles}
          />

          <S.StyledInfoBlock>
            <S.StyledSubtitle>Подойдет для вас, если:</S.StyledSubtitle>

            <S.StyledContainerRecommends>
              {currentCourse.recommends.map((item, index) => (
                <S.StyledRecommendCard key={index}>
                  <S.StyledRecommenNumber>{index + 1}</S.StyledRecommenNumber>
                  <S.StyledRecommenText>{item.recommen}</S.StyledRecommenText>
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
    </div>
  );
}
