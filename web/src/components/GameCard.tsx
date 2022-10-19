import { useNavigate } from 'react-router-dom';

import { Game } from "../redux/services/types";

interface GameCardProps{
  game: Game;
  isAd?: boolean;
}

export function GameCard({ game, isAd }: GameCardProps){
  const navigate = useNavigate();
  const adAmount = 1;
  const formattedBoxArtUrl = game.box_art_url.replace('{width}x{height}', '180x240');

  function handleClick(){
    navigate(`/games/${game.id}`);
  }

  return(
    <div className="h-[240px] w-[180px] flex flex-col rounded relative overflow-hidden animate-slideup shadow-md bg-zinc-900 group cursor-pointer" onClick={handleClick}>
      <img className="w-full h-full object-cover rounded rounded-b-md group-hover:opacity-60 transition-opacity" src={formattedBoxArtUrl} alt={game.name} />
      <div className="flex items-end h-2/3 w-full px-2 py-4 text-white bg-gradient-to-t from-zinc-900 to-transparent absolute bottom-0 left-0">
        <div className="flex w-full flex-col">
          <strong className="truncate overflow-hidden">{game.name}</strong>
          {isAd && (
            <span className="text-sm text-zinc-400">{adAmount > 1 ? `${adAmount} ads` : `${adAmount} ad`}</span>
          )}
        </div>
      </div>
    </div>
  )
}