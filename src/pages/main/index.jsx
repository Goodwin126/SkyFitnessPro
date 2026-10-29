import * as S from './styles';

import Header from '../../components/Header';
import Title from '../../components/Title';
import LessonItem from '../../components/LessonItem';
import ModalWindowLogin from '../../components/LoginWindow';

import { useSelector } from 'react-redux';

export function Main() {
  const courses = useSelector(state => state.courses.list);

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header subtitle={true} />

        <S.StyledContentLessons>
          <Title />
          <S.StyledLessonsContainer>
            {courses ? (
              courses.map(lesson => (
                <LessonItem key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <>Загружаем курсы...</>
            )}
          </S.StyledLessonsContainer>
          <S.StyledButtonScrollBox>
            <S.StyledButtonScroll
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Наверх ↑
            </S.StyledButtonScroll>
          </S.StyledButtonScrollBox>
        </S.StyledContentLessons>
      </div>
      {<ModalWindowLogin />}
    </>
  );
}
