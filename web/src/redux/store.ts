import { configureStore } from "@reduxjs/toolkit";

import { gamesReducer } from "./features/gamesList/gamesListSlice";
import { twitchApi } from "./services/twitch";
import { apiSlice } from "./features/api/apiSlice";
import { userReducer } from "./features/user/userSlice";
import { authReducer } from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [twitchApi.reducerPath]: twitchApi.reducer,
    games: gamesReducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(twitchApi.middleware)
      .concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
