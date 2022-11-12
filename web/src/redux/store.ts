import { configureStore } from '@reduxjs/toolkit';

import { gamesReducer } from './features/gamesList/gamesListSlice';
import { twitchApi } from './services/twitch';
import { apiSlice } from './features/api/apiSlice';
import { userReducer } from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [twitchApi.reducerPath]: twitchApi.reducer,
    games: gamesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(twitchApi.middleware).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
