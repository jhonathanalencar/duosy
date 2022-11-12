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
  twitchId: string;
  yearsPlaying: number;
  discord : string;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface createGameData{
  id: string; 
  title: string; 
  boxArtUrl: string;
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
    createGame: builder.mutation<GameWithAd, createGameData>({
      query: ({ id, title, boxArtUrl }) => ({
        url: 'games',
        method: 'POST',
        body: {
          id,
          title,
          boxArtUrl,
        }
      }),
      invalidatesTags: (result, error, arg) =>[
        {type: 'Game', id: "LIST"},
        {type: 'Ad', id: "LIST"}
      ]
    }),
    createAd: builder.mutation<GameWithAd, { id: string, newAd: createAdData }>({
      query: ({id, ...newAd}) => ({
        url: `games/${id}/ads`,
        method: 'POST',
        body: {
          discord: newAd.newAd.discord,
          twitchId: newAd.newAd.twitchId,
          hourEnd: newAd.newAd.hourEnd,
          hourStart: newAd.newAd.hourStart,
          name: newAd.newAd.name,
          useVoiceChannel: newAd.newAd.useVoiceChannel,
          weekDays: newAd.newAd.weekDays,
          yearsPlaying: newAd.newAd.yearsPlaying
        },
      }),
      async onQueryStarted({ id, newAd }, { dispatch, queryFulfilled }){
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getGames', undefined, (draft) =>{
            const game = draft.entities[id];
            if(game){
              game._count.ads += 1;
            }
          }),
        );
        try{
          await queryFulfilled;
        }catch{
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, args) =>[
        {type: 'Ad', id: "LIST"}
      ]
    }),
    getAds: builder.query<AdType[], string>({
      query: (gameId) => `/games/${gameId}/ads`,
      providesTags: (result, error, arg) => [
        {type: 'Ad', id: "LIST"}
      ]
    }),
    getDiscord: builder.query<Pick<AdType, "discord" | "name">, string>({
      query: (adId) => `/ads/${adId}/discord`,
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetAdsQuery,
  useCreateAdMutation,
  useCreateGameMutation,
  useGetDiscordQuery,
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