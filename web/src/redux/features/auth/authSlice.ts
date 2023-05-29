import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  apiToken: string | null;
}

const initialState: InitialState = {
  apiToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApiToken: (state, action: PayloadAction<{ access_token: string }>) => {
      state.apiToken = action.payload.access_token;
    },
  },
});

export const { setApiToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
