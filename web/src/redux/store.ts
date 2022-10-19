import { configureStore } from '@reduxjs/toolkit';

import { gamesReducer } from './features/gamesSlice';
import { twitchApi } from './services/twitch';

export const store = configureStore({
  reducer: {
    [twitchApi.reducerPath]: twitchApi.reducer,
    games: gamesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(twitchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
