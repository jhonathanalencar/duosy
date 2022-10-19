import * as Select from '@radix-ui/react-select';
import { CaretDoubleDown, CaretDoubleUp, CaretDown } from "phosphor-react";

export function GameSelect(){
  const name = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nisi ipsa tempore est. Voluptatem hic esse facilis excepturi vero enim corporis, aliquam accusamus! Totam neque voluptatum eligendi architecto maxime molestiae similique magni, soluta doloribus provident!'

  return(
    <Select.Root>
      <Select.Trigger id="game" className="w-full py-1 px-2 rounded flex justify-between  h-10 sm:h-12 items-center bg-duosy-black-500 text-gray-400 outline-none truncate text-ellipsis">
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
            <Select.Item value="Mikasa" className="h-8 w-full sm:max-w-[545px] overflow-hidden py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
              <Select.ItemText className='block truncate'>{name.substring(0, 25)}</Select.ItemText>
            </Select.Item>
            <Select.Item value="Kotori" className="h-8 w-full py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
              <Select.ItemText>Kotori</Select.ItemText>
            </Select.Item>
            <Select.Item value="Misaka" className="h-8 w-full py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
              <Select.ItemText>Misaka</Select.ItemText>
            </Select.Item>
            <Select.Item value="Misaka1" className="h-8 w-full py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
              <Select.ItemText>Misaka</Select.ItemText>
            </Select.Item>
            <Select.Item value="Misaka2" className="h-8 w-full py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
              <Select.ItemText>Misaka</Select.ItemText>
            </Select.Item>
            <Select.Item value="Misaka3" className="h-8 w-full py-1 px-2 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 outline-none cursor-pointer">
              <Select.ItemText>Misaka</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center">
            <CaretDoubleDown className="w-6 h-6 text-duosy-red-400" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}