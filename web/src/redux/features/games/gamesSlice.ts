import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import { RootState } from '../../store';
import { AdType } from '../types';

export interface GameWithAd{
  id: string;
  boxArtUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

export interface createAdData{
  name: string;
  yearsPlaying: number;
  discord : string;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

const gamesAdapter = createEntityAdapter<GameWithAd>({
  sortComparer: (a, b) => b._count.ads - a._count.ads,
});

const initialState = gamesAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) =>({
    getGames: builder.query<EntityState<GameWithAd>, void>({
      query: () => '/games',
      transformResponse: (responseData: GameWithAd[]) =>{
        const loadedGames = responseData.map((game) =>{
          return{
            ...game
          }
        })

        return gamesAdapter.setAll(initialState, loadedGames);
      },
      providesTags: (result, error, arg) =>
        result 
          ? [
              ...result.ids.map((id) => ({ type: 'Game' as const, id })),
              {type: 'Game', id: "LIST"},
            ]
          : [{type: 'Game', id: "LIST"}]
    }),
    createAd: builder.mutation<GameWithAd, { id: string, newAd: createAdData }>({
      query: ({id, ...newAd}) => ({
        url: `games/${id}/ads`,
        method: 'POST',
        body: {
          discord: newAd.newAd.discord,
          hourEnd: newAd.newAd.hourEnd,
          hourStart: newAd.newAd.hourStart,
          name: newAd.newAd.name,
          useVoiceChannel: newAd.newAd.useVoiceChannel,
          weekDays: newAd.newAd.weekDays,
          yearsPlaying: newAd.newAd.yearsPlaying
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Game', id: arg.id }
      ]
    }),
    getAds: builder.query<AdType[], string>({
      query: (gameId) => `/games/${gameId}/ads`,
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetAdsQuery,
  useCreateAdMutation,
} = extendedApiSlice;

export const selectGamesResult = extendedApiSlice.endpoints.getGames.select();

const selectGamesData = createSelector(
  selectGamesResult,
  (gamesResult) => gamesResult.data
);

export const {
  selectAll: selectAllGames,
  selectById: selectGameById,
  selectIds: selectGamesIds
} = gamesAdapter.getSelectors((state: RootState) => selectGamesData(state) ?? initialState);