import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MagnifyingGlass } from 'phosphor-react';

import { useGetGamesByNameQuery } from '../redux/services/twitch';
import { selectGames, setCurrentGames } from '../redux/features/gamesSlice';

export function SearchBar(){
  const [search, setSearch] = useState('');
  const { data, isFetching } = useGetGamesByNameQuery(search);

  const dispatch = useDispatch();
  const games = useSelector(selectGames);

  const canSubmit = Boolean(search.trim().length > 0);

  function handleSubmit(e: FormEvent){
    e.preventDefault();

    if(data && canSubmit && !isFetching){
      dispatch(setCurrentGames({games: data.data}));
    }else{
      dispatch(setCurrentGames({games: games.topGames}));
    }
  }

  useEffect(() =>{
    if(data && search && !isFetching){
      dispatch(setCurrentGames({games: data.data}));
    }
  }, [data]);

  return(
    <div className="w-full h-10 sm:h-12 sm:text-lg flex items-center bg-zinc-600 opacity-80 focus-within:opacity-100 border-2 border-transparent focus-within:border-duosy-red-500 rounded mb-4 shadow-sm animate-slidedown">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <label htmlFor="gameName" className="sr-only">Search game</label>
        <MagnifyingGlass className="h-8 w-8 ml-2 text-duosy-red-500 font-black" />
        <input 
          id="gameName"
          type="search" 
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={false}
          className="w-full bg-zinc-600 px-2 outline-none text-zinc-400"
        />
      </form>
    </div>
  )
}