import { useSelector } from 'react-redux';
import * as Select from '@radix-ui/react-select';
import { CaretDoubleDown, CaretDoubleUp, CaretDown } from "phosphor-react";

import { selectAllGames } from '../redux/features/games/gamesSlice';

export function GameSelect(){
  const games = useSelector(selectAllGames);

  return(
    <Select.Root name="game">
      <Select.Trigger className="w-full py-1 px-2 rounded flex justify-between h-10 sm:h-12 items-center bg-duosy-black-500 text-gray-400 outline-none truncate text-ellipsis">
        <Select.Value placeholder="Select game" />
        <Select.Icon>
          <CaretDown weight="bold" className="w-6 h-6 text-duosy-red-400" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-20 w-full bg-gray-800 sm:-mt-2">
          <Select.ScrollUpButton className="flex items-center justify-center">
            <CaretDoubleUp className="w-6 h-6 text-duosy-red-400" />
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Item value='' className="h-8 w-full sm:max-w-[545px] overflow-hidden py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
              <Select.ItemText className='block truncate'>
                Select Game
              </Select.ItemText>
            </Select.Item>

            {games.sort((a, b) => a.title.localeCompare(b.title, 'en')).map((game) =>{
              return(
                <Select.Item key={game.id} value={game.title} className="h-8 w-full sm:max-w-[545px] overflow-hidden py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
                  <Select.ItemText className='block truncate'>{game.title.substring(0, 25)}</Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center">
            <CaretDoubleDown className="w-6 h-6 text-duosy-red-400" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}