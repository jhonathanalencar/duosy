import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import { RootState } from '../../store';

export interface GameWithAd{
  id: string;
  boxArtUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

const gamesAdapter = createEntityAdapter<GameWithAd>({
  sortComparer: (a, b) => a._count.ads - b._count.ads,
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
  }),
});

export const {
  useGetGamesQuery,
} = extendedApiSlice;

export const selectGamesResult = extendedApiSlice.endpoints.getGames.select();

const selectGamesData = createSelector(
  selectGamesResult,
  (gamesResult) => gamesResult.data
);

export const {
  selectAll: selectAllGames,
} = gamesAdapter.getSelectors((state: RootState) => selectGamesData(state) ?? initialState);