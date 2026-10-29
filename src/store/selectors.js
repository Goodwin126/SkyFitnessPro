import { createSelector } from '@reduxjs/toolkit';

// 1. Сначала создаем базовые селекторы (как кирпичики)
const selectAuth = state => state.auth;
const selectCourses = state => state.courses;

// 2. Селектор для получения текущего курса
const selectCurrentCourse = createSelector(
  [selectCourses],
  courses => courses.current
);

// 3. Селектор для получения текущей тренировки
const selectCurrentWorkout = createSelector(
  [selectCourses],
  courses => courses.currentWorkoutVideo
);

// 4. ГЛАВНЫЙ СЕЛЕКТОР: Получает прогресс пользователя для конкретной тренировки
// Он принимает state, а также courseId и workoutId как аргументы
export const selectUserProgressForWorkout = createSelector(
  [selectAuth, selectCurrentCourse, selectCurrentWorkout],
  (auth, course, workout) => {
    // Если чего-то нет, возвращаем пустой массив (но это будет ОДИН И ТОТ ЖЕ массив благодаря createSelector)
    if (!auth?.user || !course?.id || !workout?.id) {
      return [];
    }

    const userCourseData = auth.user.userCourse;

    // Безопасное получение вложенных данных
    const progressArray = userCourseData?.[course.id]?.[workout.id];

    // Возвращаем данные или пустой массив
    return progressArray || [];
  }
);

export const selectCourseByIdSelector = (state, courseId) => {
  const allCourses = state.courses.list;

  const targetId = String(courseId);

  const foundCourse = allCourses.find(c => String(c.id) === targetId);

  if (foundCourse) {
    return foundCourse;
  } else {
    console.warn(`⚠️ Course with ID ${targetId} not found.`);
    return null;
  }
};

export const selectUserCoursesWithProgress = createSelector(
  [state => state.auth.user, state => state.courses.list],
  (user, allCourses) => {
    // 1. Базовая защита
    if (!user || !user.userCourse) return [];

    // 2. Защита от null/undefined списка курсов
    if (!allCourses || !Array.isArray(allCourses)) {
      return [];
    }

    return Object.keys(user.userCourse).map(courseId => {
      // ✅ СТАЛО: Оставляем как есть. ID - это строка ("9mefwq")
      const id = courseId;

      // Ищем курс, сравнивая СТРОКУ со СТРОКОЙ
      // Если в allCourses.id тоже строки (как в MongoDB), то сработает идеально.
      const fullCourse = allCourses.find(c => c.id === id);

      if (!fullCourse) {
        // Заглушка: оставляем id строкой, чтобы не ломать логику ниже
        return {
          id: id,
          nameRU: 'Курс загружается...',
          listImage: '',
          countDaysLesson: 0,
          timeLesson: 0,
          workouts: [],
          // Берем прогресс по ключу-строке
          progress: user.courseProgress?.[id] || {},
        };
      }

      return {
        ...fullCourse,
        // Берем прогресс по ключу-строке
        progress: user.courseProgress?.[id] || {},
      };
    });
  }
);
