import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetGamesByNameResponse, GetTopGamesResponse } from './types';

export const twitchApi = createApi({
  reducerPath: 'twitchApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.twitch.tv/helix/',  
    prepareHeaders: (headers) =>{
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_TWITCH_APP_TOKEN}`);
      headers.set('Client-Id', import.meta.env.VITE_TWITCH_CLIENT_ID);
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopGames: builder.query<GetTopGamesResponse, void>({ query: () => 'games/top?first=100' }),
    getGamesByName: builder.query<GetGamesByNameResponse, string>({ query: (gameName) => `games?name=${gameName}` }),
  }),
});

export const {
  useGetTopGamesQuery,
  useGetGamesByNameQuery,
} = twitchApi;