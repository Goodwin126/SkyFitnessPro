import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_URL;

export const loadProfile = createAsyncThunk('user/loadProfile', async () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Profile load failed:', error);
    throw error;
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async args => {
    const { email, password, username } = args;

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const customError = new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
        customError.status = response.status;
        customError.data = errorData;
        throw customError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk('user/loginUser', async args => {
  const { email, password } = args;

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const customError = new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
      customError.status = response.status;
      customError.data = errorData;
      throw customError;
    }

    const data = await response.json();
    const newToken = data.accessToken;
    if (newToken) {
      localStorage.clear();
      localStorage.setItem('access_token', newToken);
      console.log('✅ Токен сохранен в localStorage');
    } else {
      throw new Error('Бэкенд не вернул токен доступа');
    }

    return data;
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
});

const userSlice = createSlice({
  name: 'storage',
  initialState: {
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    logout: state => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.isLoading = false;
        console.error('❌ REDUCER CAUGHT ERROR:', action.error.message);
        state.error = action.error.message;
      })
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
        console.error('❌ REDUCER CAUGHT ERROR:', action.error.message);
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload;
        if (data.user) {
          state.user = data.user;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        console.error('❌ Login Error:', action.error.message);
        state.error = action.error.message;
      });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
