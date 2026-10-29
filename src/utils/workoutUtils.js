export const findFirstMissingWorkout = (workouts, userExercises) => {
  if (!workouts) return null;

  const safeUserExercises = userExercises || {};

  // Ищем первый ID, которого нет в выполненных упражнениях
  const firstMissingId = Object.keys(workouts).find(id => {
    return !(id in safeUserExercises);
  });

  if (firstMissingId) {
    return {
      id: firstMissingId,
      name: workouts[firstMissingId],
      completed: false,
    };
  }

  return null;
};
