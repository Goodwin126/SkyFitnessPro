import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import coursesReducer from './coursesSlice';
import uiReducer from './uiSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    ui: uiReducer,
  },
});
