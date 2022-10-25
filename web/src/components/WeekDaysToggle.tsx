import { useState } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { cn } from "../utils/className";
import { weekDaysData } from "../constants";

interface WeekDaysToggleProps{
  weekDays: number[];
  setWeekDays: React.Dispatch<React.SetStateAction<number[]>>;
}

export function WeekDaysToggle({ weekDays, setWeekDays }: WeekDaysToggleProps){

  return(
    <ToggleGroup.Root
      id="weekDays"
      aria-label="When do you usually play?"
      type="multiple"
      onValueChange={(value) => setWeekDays(value.map(Number))}
      className="flex gap-2 items-center justify-center flex-wrap sm:flex-nowrap"
    >
      {weekDaysData.map((day) =>{
        return(
          <ToggleGroup.Item 
            key={day.id}
            title={day.title}
            value={day.value}
            className={cn(
              'py-1 px-2 w-8 sm:h-12 sm:w-10 text-gray-200 font-black rounded outline-none',
              weekDays.includes(Number(day.value)) ? 'bg-duosy-red-400' : 'bg-duosy-black-500',
            )}
          >
            {day.name}
          </ToggleGroup.Item>
        )
      })}
    </ToggleGroup.Root>
  )
}