import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { 
  GetGameByIdResponse, 
  GetGamesByNameResponse, 
  GetTopGamesResponse,
  SendWhisperData, 
} from './types';

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
    getTopGames: builder.query<GetTopGamesResponse, void>({ 
      query: () => 'games/top?first=100' 
    }),
    getGamesByName: builder.query<GetGamesByNameResponse, string>({
      query: (gameName) => `games?name=${gameName}` 
    }),
    getGameById: builder.query<GetGameByIdResponse, string>({
      query: (id) => `games?id=${id}`,
    }),
    sendWhisper: builder.mutation<void, SendWhisperData>({
      query: ({ authenticatedUserId, targetUserId, message, accessToken }) => ({
        url: `whispers?from_user_id=${authenticatedUserId}&to_user_id=${targetUserId}`,
        method: 'POST',
        body: {
          message,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID,
        }
      })
    })
  }),
});

export const {
  useGetTopGamesQuery,
  useGetGamesByNameQuery,
  useGetGameByIdQuery,
  useSendWhisperMutation,
} = twitchApi;