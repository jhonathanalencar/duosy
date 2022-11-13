import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game } from '../../services/types';
import { RootState } from '../../store';

interface GamesState{
  currentGames: Game[];
  topGames: Game[];
}

const initialState: GamesState = {
  currentGames: [],
  topGames: [],
}

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setTopGames: (state, action: PayloadAction<{games: Game[]}>) =>{
      state.topGames = action.payload.games;
    },
    setCurrentGames: (state, action: PayloadAction<{games: Game[]}>) =>{
      state.currentGames = action.payload.games;
    },
  }
});

export const {
  setTopGames,
  setCurrentGames,
} = gamesSlice.actions;

export const gamesReducer = gamesSlice.reducer;

export const selectGames = (state: RootState) => state.games;
