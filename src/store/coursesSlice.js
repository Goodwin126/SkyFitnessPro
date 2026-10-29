import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_URL;

export const loadCouses = createAsyncThunk('courses/loadCourses', async () => {
  const response = await fetch(`${BASE_URL}/api/courses`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.data;
});

export const loadCousesByID = createAsyncThunk(
  'courses/loadCourseById',
  async id => {
    const response = await fetch(`${BASE_URL}/api/courses/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  }
);

export const loadWorkoutVideoListByCourseID = createAsyncThunk(
  'courses/workoutVideoListByCourseId',
  async id => {
    const response = await fetch(
      `${BASE_URL}/api/workout-video/listWorkoutVideoBy/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  }
);

export const loadWorkoutVideoByID = createAsyncThunk(
  'courses/workoutVideoById',
  async id => {
    const response = await fetch(`${BASE_URL}/api/workout-video/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: null, // Было courses
    current: null, // Было currentCourse
    currentWorkoutVideoList: null,
    currentWorkoutVideo: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentCourse: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Load List
      .addCase(loadCouses.pending, s => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(loadCouses.fulfilled, (s, a) => {
        s.isLoading = false;
        s.list = a.payload;
      })
      .addCase(loadCouses.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message;
      })

      // Load Single
      .addCase(loadCousesByID.pending, s => {
        s.current = null;
        s.isLoading = true;
        s.error = null;
      })
      .addCase(loadCousesByID.fulfilled, (s, a) => {
        s.current = a.payload;
        s.isLoading = false;
      })
      .addCase(loadCousesByID.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message;
      })

      // Workout Video List
      .addCase(loadWorkoutVideoListByCourseID.pending, s => {
        s.currentWorkoutVideoList = null;
        s.isLoading = true;
      })
      .addCase(loadWorkoutVideoListByCourseID.fulfilled, (s, a) => {
        s.currentWorkoutVideoList = a.payload;
        s.isLoading = false;
      })
      .addCase(loadWorkoutVideoListByCourseID.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message;
      })

      // Workout Video
      .addCase(loadWorkoutVideoByID.pending, s => {
        s.currentWorkoutVideo = null;
        s.isLoading = true;
      })
      .addCase(loadWorkoutVideoByID.fulfilled, (s, a) => {
        s.currentWorkoutVideo = a.payload;
        s.isLoading = false;
      })
      .addCase(loadWorkoutVideoByID.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message;
      });
  },
});

export const { setCurrentCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
