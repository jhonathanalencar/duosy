import { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from "phosphor-react";

import { 
  InputField, 
  GameSelect, 
  WeekDaysToggle,
  Checkbox,
} from './';

export function PublishAdForm(){
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [useVoiceChat, setUseVoiceChat] = useState(false);

  function handleCreateAd(event: FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);
    
    console.log(data);
    console.log(weekDays);
    console.log(useVoiceChat)
  }

  return(
    <Dialog.Portal>
      <Dialog.Overlay className="flex h-full absolute z-10 inset-0 p-4 bg-duosy-black-500/70 overflow-auto">
        <Dialog.Content className="flex flex-1 flex-col gap-4 items-center justify-center bg-duosy-black-400 p-4 rounded h-fit max-w-xl m-auto">
          <Dialog.Title className="text-gray-200 text-3xl font-bold self-start">Publish an ad</Dialog.Title>
          <form onSubmit={handleCreateAd} className="flex flex-1 flex-col w-full gap-4">
            <InputField.Root>
              <InputField.Label htmlFor="game">Game</InputField.Label>
              <GameSelect />
            </InputField.Root>

            <InputField.Root>
              <InputField.Label htmlFor="nickname">Nickname</InputField.Label>
              <InputField.Input 
                id="nickname"
                name="nickname"
                type="text"
                placeholder="Your nickname"
              />
            </InputField.Root>
            <div className="w-full flex flex-col items-center gap-4 sm:flex-row">
              <InputField.Root>
                <InputField.Label htmlFor="years">How long have you been playing?</InputField.Label>
                <InputField.Input 
                  id="years"
                  name="years"
                  type="number"
                  placeholder="It is ok to be zero"
                />
              </InputField.Root>

              <InputField.Root>
                <InputField.Label htmlFor="discord">What is your Discord?</InputField.Label>
                <InputField.Input 
                  id="discord"
                  name="discord"
                  type="text"
                  placeholder="User#0000"
                />
              </InputField.Root>
            </div>
            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <InputField.Root>
                <InputField.Label htmlFor="weekDays">When do you usually play?</InputField.Label>
                <WeekDaysToggle 
                  weekDays={weekDays} 
                  setWeekDays={setWeekDays}
                />
              </InputField.Root>

              <InputField.Root>
                <fieldset className="w-full flex items-center gap-4">
                    <InputField.Label asChild className="mb-1">
                      <legend>At what time of the day?</legend>
                    </InputField.Label>

                    <InputField.Label className="sr-only" htmlFor="hourStart">Hour Start</InputField.Label>
                    <InputField.Input 
                      id="hourStart"
                      name="hourStart"
                      type="time"
                      placeholder="from"
                    />
                    <InputField.Label className="sr-only" htmlFor="hourEnd">Hour End</InputField.Label>
                    <InputField.Input 
                      id="hourEnd"
                      name="hourEnd"
                      type="time"
                      placeholder="to"
                    />
                </fieldset>
              </InputField.Root>
            </div>
            <InputField.Root className="w-full flex items-center gap-2">
              <Checkbox 
                useVoiceChat={useVoiceChat}
                setUseVoiceChat={setUseVoiceChat}
              />
              <InputField.Label htmlFor="useVoiceChat">I usually use voice chat</InputField.Label>
            </InputField.Root>
            <div className="w-full flex items-center gap-4 justify-between sm:justify-end">
              <Dialog.Close
                type="button"
                className="font-semibold text-base text-gray-100 bg-duosy-violet-300 hover:bg-duosy-violet-400 transition-colors py-2 px-4 rounded outline-none"
              >
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                className="flex items-center gap-2 py-2 px-4 rounded bg-duosy-red-400 hover:bg-duosy-red-500 transition-colors outline-none"
              >
                <GameController weight="bold" className="h-6 w-6 text-gray-200" />
                <span className="text-gray-200 font-semibold">Find duo</span>
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}