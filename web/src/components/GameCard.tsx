import { useNavigate } from 'react-router-dom';
import { GameWithAd } from '../redux/features/games/gamesSlice';

import { Game } from "../redux/services/types";
import { ErrorMessage } from './ErrorMessage';

interface GameCardProps{
  game?: Game;
  data?: GameWithAd;
}

export function GameCard({ 
  game, 
  data,
}: GameCardProps){
  const navigate = useNavigate();

  if(game){
    const { id, name, box_art_url } = game;
    const formattedBoxArtUrl = box_art_url.replace('{width}x{height}', '180x240')

    function handleClick(){
      navigate(`/games/${id}`);
    }

    return(
      <div className="h-[240px] w-[180px] flex flex-col rounded relative overflow-hidden animate-slideup shadow-md bg-zinc-900 group cursor-pointer" onClick={handleClick}>
        <img className="w-full h-full object-cover rounded rounded-b-md group-hover:opacity-60 transition-opacity" src={formattedBoxArtUrl} alt={name} />
        <div className="flex items-end h-2/3 w-full px-2 py-4 text-white bg-gradient-to-t from-zinc-900 to-transparent absolute bottom-0 left-0">
          <div className="flex w-full flex-col">
            <strong className="truncate overflow-hidden">{name}</strong>
          </div>
        </div>
      </div>
    )
  }

  if(!data){
    return <ErrorMessage />
  };

  const { id, title, boxArtUrl, _count } = data;

  const formattedBoxArtUrl = boxArtUrl.replace('{width}x{height}', '180x240')

  function handleClick(){
    navigate(`/games/${id}`);
  }

  return(
    <div className="h-[240px] w-[180px] flex flex-col rounded relative overflow-hidden animate-slideup shadow-md bg-zinc-900 group cursor-pointer" onClick={handleClick}>
      <img className="w-full h-full object-cover rounded rounded-b-md group-hover:opacity-60 transition-opacity" src={formattedBoxArtUrl} alt={title} />
      <div className="flex items-end h-2/3 w-full px-2 py-4 text-white bg-gradient-to-t from-zinc-900 to-transparent absolute bottom-0 left-0">
        <div className="flex w-full flex-col">
          <strong className="truncate overflow-hidden">{title}</strong>
          <span className="text-sm text-zinc-400">{_count.ads > 1 ? `${_count.ads} ads` : `${_count.ads} ad`}</span>
        </div>
      </div>
    </div>
  )
}