import Header from '../../components/Header';
import * as S from './styles';
import { WorkoutLessons, WorkoutUserProgress } from '../../data/coursesConfig';

export function WorkoutVideo() {
  const selectedLessonId = 1;

  // 1. Находим текущий урок
  const lesson = WorkoutLessons.find(item => item.id === selectedLessonId);

  if (!lesson) {
    return <div>Урок не найден</div>;
  }

  // 2. Получаем массив прогресса для этого пользователя
  // Проверяем, что LessonId совпадает, и берем массив чисел
  const userProgressArray =
    WorkoutUserProgress.progress.LessonId === selectedLessonId
      ? WorkoutUserProgress.progress.progress
      : [];

  return (
    <>
      <Header subtitle={false} />

      <S.StyledContetntBox>
        <S.StyledTitle>Йога</S.StyledTitle>
        <S.StyledpathLessons>
          <S.StyledLink href="#">Красота и здоровье</S.StyledLink> /{' '}
          <S.StyledLink href="#">Йога на каждый день</S.StyledLink> /{' '}
          <S.StyledLink href="#">2 день</S.StyledLink>
        </S.StyledpathLessons>
        <S.StyledVideo
          src={lesson.src}
          controls
          poster={lesson.poster}
          aria-label={lesson.NameLesson}
        />
      </S.StyledContetntBox>

      <S.StyledInfoBox>
        <S.StyledNameLesson>{lesson.NameLesson}</S.StyledNameLesson>
        <S.StyleProgressBox>
          {/* ИСПРАВЛЕНО: Перебираем задачи, передавая индекс */}
          {lesson.ListTask.map((task, index) => {
            // Берем прогресс по тому же индексу. Если данных нет - ставим 0
            const progressValue = userProgressArray[index] ?? 0;

            return (
              <S.StyleProgressItem key={index}>
                <S.StyleProgressName>
                  {task} {progressValue}%
                </S.StyleProgressName>

                {/* ИСПРАВЛЕНО: Передаем конкретный прогресс задачи, а не lesson.progress */}
                <S.StyledLessonProgressLine
                  $progress={progressValue}
                  $color={S.PRIMARY_COLOR}
                  aria-label={`Прогресс: ${task}`}
                />
              </S.StyleProgressItem>
            );
          })}
        </S.StyleProgressBox>
        <S.StyledLessonButton>Заполнить свой прогресс</S.StyledLessonButton>
      </S.StyledInfoBox>
    </>
  );
}
