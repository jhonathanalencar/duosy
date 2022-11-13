import { FormEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { toast } from 'react-toastify';

import { createAdData, useCreateAdMutation } from '../redux/features/games/gamesSlice';
import { selectUser } from '../redux/features/user/userSlice';

import { 
  InputField, 
  GameSelect, 
  WeekDaysToggle,
  Checkbox,
} from './';

export function PublishAdForm(){
  const { user } = useSelector(selectUser);

  const [createAd, { isLoading }] = useCreateAdMutation();
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [useVoiceChat, setUseVoiceChat] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleCreateAd(event: FormEvent){
    event.preventDefault();
 
    if(!user){ return; }
    
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
 
    const newAd = {
      name: data.nickname,
      twitchId: user.id,
      yearsPlaying: Number(data.years),
      discord: data.discord,
      hourEnd: data.hourEnd,
      hourStart: data.hourStart,
      weekDays,
      useVoiceChannel: useVoiceChat,
    } as createAdData;
  
    const {
      useVoiceChannel,
      yearsPlaying,
      ...requiredFields
    } = newAd;

    const canSubmit = Object.values(requiredFields).every(Boolean) && !isLoading && requiredFields.weekDays.length > 0 && data.game;

    if(canSubmit){
      try{
        createAd({ id: data.game as string, newAd }).unwrap();
  
        toast('Ad created successfully.', { 
          type: 'success', 
        });

        formRef.current?.reset();
        setWeekDays([]);
        setUseVoiceChat(false);
      }catch(error){
        toast(
          'The operation could not be completed. Please try again.', 
          {
            type: 'error',
          }
        );
      }
    }else{
      toast(
        'Please fill out all required fields.', 
        {
          type: 'warning',
        }
      );
    }
  }

  return(
    <Dialog.Portal>
      <Dialog.Overlay className="flex h-full absolute z-10 inset-0 p-4 bg-duosy-black-500/70 overflow-auto">
        <Dialog.Content className="flex flex-1 flex-col gap-4 items-center justify-center bg-duosy-black-400 p-4 rounded h-fit max-w-xl m-auto">
          <Dialog.Title className="text-gray-200 text-3xl font-bold self-start">Publish an ad</Dialog.Title>
          <form onSubmit={handleCreateAd} ref={formRef} className="flex flex-1 flex-col w-full gap-4">
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
                required
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
                  required
                />
              </InputField.Root>

              <InputField.Root>
                <InputField.Label htmlFor="discord">What is your Discord?</InputField.Label>
                <InputField.Input 
                  id="discord"
                  name="discord"
                  type="text"
                  placeholder="User#0000"
                  required
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
                      required
                    />
                    <InputField.Label className="sr-only" htmlFor="hourEnd">Hour End</InputField.Label>
                    <InputField.Input 
                      id="hourEnd"
                      name="hourEnd"
                      type="time"
                      placeholder="to"
                      required
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
                Close
              </Dialog.Close>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 py-2 px-4 rounded bg-duosy-red-400 hover:bg-duosy-red-500 disabled:bg-duosy-red-400 disabled:opacity-70 disabled:cursor-not-allowed transition-colors outline-none"
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