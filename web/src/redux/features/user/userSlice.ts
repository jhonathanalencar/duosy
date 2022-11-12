import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

interface User{
  id: string; 
  accessToken: string;
  display_name: string; 
  profile_image_url: string; 
  created_at: string; 
}

interface userState{
  user: User | null;
}

const initialState: userState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) =>{
      state.user = action.payload;
    },
    logout: (state) =>{
      state.user = null;
    }
  }
});

export const {
  setUser,
  logout,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
