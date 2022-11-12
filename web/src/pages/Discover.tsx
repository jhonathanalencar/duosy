import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useGetTopGamesQuery } from "../redux/services/twitch";
import { selectGames, setCurrentGames, setTopGames } from '../redux/features/gamesList/gamesListSlice';

import { Loader, ErrorMessage, SearchBar, Games } from "../components";

export function Discover(){
  const { data, error, isFetching } = useGetTopGamesQuery();

  const dispatch = useDispatch();
  const games = useSelector(selectGames);

  useEffect(() =>{
    if(data){
      dispatch(setTopGames({games: data.data}));
      dispatch(setCurrentGames({games: data.data}));
    }
  }, [data]);

  if(error){
    return(
      <ErrorMessage />
    )
  }

  return(
    <div className="flex flex-1 flex-col h-full px-8 bg-blackGradient">
      <div className="relative h-full w-full overflow-hidden max-w-6xl mx-auto">
        <div className="absolute h-full w-full top-0 left-0 overflow-auto hide-scrollbar flex flex-1 flex-wrap justify-center gap-4 pt-8 pb-24">
          {isFetching ? (
            <Loader />
            ) : (
            <>
              <div className="flex flex-col w-full gap-4">
                <h1 className="text-4xl w-full font-black text-duosy-red-400 animate-slidedown">Games</h1>
                <SearchBar /> 
              </div>
              {games.currentGames.length > 0 ? (
                <Games data={games.currentGames} />
              ) : (
                <ErrorMessage message="This game could not be found. The name must be an exact match." />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}