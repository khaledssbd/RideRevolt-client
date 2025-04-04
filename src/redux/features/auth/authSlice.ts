import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TUserFromToken = {
  email: string;
  name: string;
  image: string;
  gender: 'male' | 'female' | 'other';
  role: 'customer' | 'admin';
  iat: number;
  exp: number;
};

type TInitialState = {
  user: TUserFromToken | null;
  token: string | null;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// export const selectToken = (state: RootState) => (state.auth as TInitialState).token;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserRole = (state: RootState) => state?.auth?.user?.role;
