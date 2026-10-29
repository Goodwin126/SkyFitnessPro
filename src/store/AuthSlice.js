import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_URL;

// --- THUNKS (Асинхронные действия) ---

export const loadProfile = createAsyncThunk('auth/loadProfile', async () => {
  const token = localStorage.getItem('access_token');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${BASE_URL}/api/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return await response.json();
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, username }) => {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const err = new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
      err.status = response.status;
      err.data = errorData;
      throw err;
    }
    return await response.json();
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { dispatch }) => {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const err = new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
      err.status = response.status;
      err.data = errorData;
      throw err;
    }

    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem('access_token', data.accessToken);
      await dispatch(loadProfile());
    } else {
      throw new Error('Бэкенд не вернул токен доступа');
    }

    return data;
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return null;
    }

    try {
      await dispatch(loadProfile());
    } catch (error) {
      console.warn('Сессия не восстановлена', error);
      localStorage.removeItem('access_token');
      throw error;
    }
  }
);

export const addCousesByID = createAsyncThunk(
  'courses/addCourse',
  async (courseId, { dispatch }) => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${BASE_URL}/api/courses/add-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    await dispatch(loadProfile());
  }
);

export const deleteCousesByID = createAsyncThunk(
  'auth/removeCourse',
  async courseId => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token');

    try {
      const response = await fetch(`${BASE_URL}/api/courses/remove-course`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to remove course');
      }

      return { success: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateProgressWorkoutVideo = createAsyncThunk(
  'update-progress/workoutVideoByIdandByCourseId',
  async updateValue => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token');

    const response = await fetch(`${BASE_URL}/api/courses/update-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateValue),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('access_token');
    },
    // 1. ОПТИМИСТИЧНОЕ УДАЛЕНИЕ: вырезаем курс из объекта userCourse
    removeCourseOptimistic: (state, action) => {
      const courseIdToRemove = action.payload;

      if (state.user && state.user.userCourse) {
        const updatedUserCourse = { ...state.user.userCourse };
        delete updatedUserCourse[courseIdToRemove];

        state.user = {
          ...state.user,
          userCourse: updatedUserCourse,
        };
      }
    },

    // 2. ВОССТАНОВЛЕНИЕ ПРИ ОШИБКЕ: возвращаем курс обратно
    restoreCourseOnError: (state, action) => {
      const fullCourseObject = action.payload;
      if (state.user && fullCourseObject) {
        state.user = {
          ...state.user,
          userCourse: {
            ...state.user.userCourse,
            [fullCourseObject.id]: fullCourseObject,
          },
        };
      }
    },

    updateProgressOptimistic: (state, action) => {
      const { courseId, workoutId, exercises } = action.payload;

      if (!state.user || !state.user.userCourse) return;
      const courseData = state.user.userCourse[courseId];

      if (exercises.progressPercent !== undefined) {
        courseData.percent = exercises.progressPercent;
      }

      const workoutExercises = courseData[workoutId];

      if (Array.isArray(workoutExercises) && exercises.exercises) {
        const quantities = exercises.exercises.map(ex => ex.quantity);

        courseData[workoutId] = quantities;
      }
    },
    // 2. ОТКАТ ПРИ ОШИБКЕ: Возвращаем старые цифры
    rollbackProgressOptimistic: (state, action) => {
      const { courseId, workoutId, oldExercises } = action.payload;
      if (!state.user || !state.user.userCourse) return;

      const courseData = state.user.userCourse[courseId];
      if (!courseData || typeof courseData !== 'object') return;

      const workoutExercises = courseData[workoutId];
      if (!Array.isArray(workoutExercises)) return;

      oldExercises.forEach(ex => {
        const target = workoutExercises.find(e => e.name === ex.name);
        if (target) target.quantity = ex.quantity;
      });
    },
    // 3. ПРИМЕНЕНИЕ ДАННЫХ С БЭКЕНДА: Обновляем процент и статус
    applyServerProgress: (state, action) => {
      const { courseId, workoutId, data } = action.payload;

      if (!state.user) return;

      if (!state.user.userCourse) {
        state.user.userCourse = {};
      }

      const courseData = state.user.userCourse[courseId] || {};

      if (!courseData[workoutId]) {
        courseData[workoutId] = [];
      }

      if (data.exercises && Array.isArray(data.exercises)) {
        const quantities = data.exercises.map(ex => ex.quantity);
        courseData[workoutId] = quantities;
      }

      // Сохраняем обновленный объект обратно в стор (на случай, если создали новый)
      state.user.userCourse[courseId] = courseData;

      // --- БЛОК Б: Гарантируем структуру для courseProgress (статус и общий прогресс) ---
      if (!state.user.courseProgress) {
        state.user.courseProgress = {};
      }

      if (!state.user.courseProgress[courseId]) {
        state.user.courseProgress[courseId] = {};
      }

      const targetProgress =
        state.user.courseProgress[courseId][workoutId] || {};

      // Заполняем данными от сервера
      targetProgress.percent = data.progressPercent ?? targetProgress.percent;
      targetProgress.status = data.status ?? targetProgress.status;

      if (data.details) {
        targetProgress.totalRepsDone =
          data.details.totalUserReps ?? targetProgress.totalRepsDone;
        targetProgress.totalRepsTarget =
          data.details.totalTargetReps ?? targetProgress.totalRepsTarget;
        // Можно также сохранить lastUpdated, если он есть в data
      }

      state.user.courseProgress[courseId][workoutId] = targetProgress;
    },
  },
  extraReducers: builder => {
    builder
      // --- loadProfile ---
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loadProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // --- registerUser ---
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // --- loginUser ---
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // --- restoreSession ---
      .addCase(restoreSession.pending, state => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message;
        console.error('Авто-логин не удался:', action.error.message);
      })

      // Add
      .addCase(addCousesByID.pending, s => {
        s.isLoading = true;
      })
      .addCase(addCousesByID.fulfilled, s => {
        s.isLoading = false;
      })
      .addCase(addCousesByID.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message;
      })

      // Delete

      .addCase(deleteCousesByID.pending, s => {
        s.isLoading = true;
      })
      .addCase(deleteCousesByID.fulfilled, s => {
        s.isLoading = false;
        s.error = null;
      })
      .addCase(deleteCousesByID.rejected, (s, action) => {
        s.isLoading = false;
        s.error = action.error.message;
      })

      // UpdateProgress
      .addCase(updateProgressWorkoutVideo.pending, s => {
        s.isLoading = true;
      })

      .addCase(updateProgressWorkoutVideo.fulfilled, (state, action) => {
        const originalPayload = action.meta.arg;

        const { courseId, workoutId } = originalPayload;

        if (!originalPayload) return;

        if (!state.user || !state.user.userCourse) return;
        const courseData = state.user.userCourse[courseId];

        const workoutExercises = courseData[workoutId];

        if (Array.isArray(workoutExercises) && originalPayload.exercises) {
          const quantities = originalPayload.exercises.map(ex => ex.quantity);

          courseData[workoutId] = quantities;
        }
      })

      .addCase(updateProgressWorkoutVideo.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message;
      });
  },
});

export const {
  logout,
  removeCourseOptimistic,
  restoreCourseOnError,
  updateProgressOptimistic,
  rollbackProgressOptimistic,
  applyServerProgress,
} = authSlice.actions;

export default authSlice.reducer;
