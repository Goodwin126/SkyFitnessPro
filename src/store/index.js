import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../store/AuthSlice';
export default configureStore({
  reducer: {
    storage: userSlice,
  },
});
