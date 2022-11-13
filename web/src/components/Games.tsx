import { Game } from '../redux/services/types';

import { GameCard } from './';

interface GamesProps{
  data: Game[];
}

export function Games({ data }: GamesProps){
  return(
    <>
      {data.map((game) =>{
        return(
          <GameCard 
            key={game.id}
            game={game}
          />
        )
      })}
    </>
  )
}