import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalWindow: {
      modalOpen: false,
      modeLogin: null, // 'Login', 'Registration', 'CourseSelection'
      errorType: false, // 'password', 'login', 'used yet' или false
    },
  },
  reducers: {
    closeModal: state => {
      state.modalWindow.modalOpen = false;
      state.modalWindow.errorType = false;
      state.modalWindow.modeLogin = null;
    },
    openModal: (state, mode) => {
      state.modalWindow.modalOpen = true;
      state.modalWindow.modeLogin = mode.payload;
      state.modalWindow.errorType = mode.error || false;
    },
    setErrorType: (state, error) => {
      state.modalWindow.errorType = error;
    },
    toggleMode: (state, mode) => {
      state.modalWindow.modeLogin = mode.payload;
    },
  },
});

export const { closeModal, openModal, setErrorType, toggleMode } =
  uiSlice.actions;
export default uiSlice.reducer;
