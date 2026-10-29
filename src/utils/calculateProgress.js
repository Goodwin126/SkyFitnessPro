/**
 * Считает прогресс для каждого упражнения на основе плана и факта выполнения.
 * @param {Array} planTasks - Массив упражнений из плана (с target quantity)
 * @param {Array} doneTasks - Массив прогресса пользователя (с current quantity)
 * @returns {Array} Массив объектов с добавленными полями currentQty, percent, isComplete
 */
export const calculateExerciseProgress = (planTasks, doneTasks) => {
  // 1. Базовая валидация
  if (!Array.isArray(planTasks) || !Array.isArray(doneTasks)) {
    return [];
  }

  return planTasks.map((planTask, index) => {
    // 2. Берем значение из doneTasks по тому же индексу
    // Если такого индекса нет (массив короче), считаем 0
    const currentValue = doneTasks[index] ?? 0;

    const targetQty = planTask.quantity;

    // Защита от NaN, если вдруг currentValue не число
    const currentQty = typeof currentValue === 'number' ? currentValue : 0;

    // 3. Считаем процент
    const percent =
      targetQty > 0 ? Math.round((currentQty / targetQty) * 100) : 0;

    return {
      ...planTask,
      currentQty,
      percent,
      isComplete: percent >= 100,
    };
  });
};

// Общий прогресс тренировки (среднее арифметическое или макс из упражнений - тут среднее)
export const calculateCourseTotalProgress = courseProgressObject => {
  // Если данных нет или это не объект — возвращаем 0
  if (!courseProgressObject || typeof courseProgressObject !== 'object') {
    return 0;
  }

  // 1. Получаем все массивы упражнений из объекта (значения)
  const allWorkoutsArrays = Object.values(courseProgressObject);

  // 2. Превращаем массив массивов в один плоский массив всех упражнений
  const allExercises = allWorkoutsArrays.flat();

  // Если упражнений нет — прогресс 0%
  if (allExercises.length === 0) {
    return 0;
  }

  // 3. Считаем сумму процентов всех упражнений
  const sumPercent = allExercises.reduce(
    (acc, item) => acc + (item.percent || 0),
    0
  );

  // 4. Делим на общее количество упражнений
  return Math.round(sumPercent / allExercises.length);
};
