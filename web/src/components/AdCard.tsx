import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from "phosphor-react";
import { formatDistanceToNow } from 'date-fns';

import { AdType } from "../redux/features/types";

import { AdInfo } from "./AdInfo";
import { DiscordModal } from './DiscordModal';

interface AdCardProps{
  ad: AdType;
}

export function AdCard({ ad }: AdCardProps){
  const [isOpen, setIsOpen] = useState(false);

  const displayWeekDays: { [key: number]: string } = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  }

  const weekDaysTitle = ad.weekDays.map((day) => displayWeekDays[day]);

  function formatToProperVerb(value: number, verbs: string[]){
    return value > 1 ? `${value} ${verbs[1]}` : `${value} ${verbs[0]}`;
  }

  function handleCloseModal(){
    setIsOpen(false);
  }
  
  return(
    <div className="bg-duosy-black-400 rounded p-4 flex flex-col items-start border-t-2 border-duosy-violet-400 gap-3 animate-slideup">
      <AdInfo 
        title="Nickname"
        description={ad.name}
      />
      <AdInfo 
        title="Play Time"
        description={ad.yearsPlaying > 0 
          ? formatToProperVerb(ad.yearsPlaying, ['year', 'years'])
          : 'No play time yet'
        }
      />
      <AdInfo 
        title="Join the voice channel?"
        description={ad.useVoiceChannel ? 'yes' : 'no'}
        textColor={ad.useVoiceChannel ? 'text-green-400' : 'text-red-500'}
      />
      <AdInfo 
        title="Availability"
        weekDays={weekDaysTitle}
        description={`${formatToProperVerb(ad.weekDays.length, ['day', 'days'])}・${ad.hourStart} - ${ad.hourEnd}`}
      />

      <span className="font-semibold text-gray-400">
        {formatDistanceToNow(new Date(ad.createdAt), { addSuffix: true })}
      </span>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger className="inline-flex items-center mx-auto bg-duosy-red-400 py-2 px-4 rounded mt-2 gap-2 hover:bg-duosy-red-500 transition-colors">
          <GameController className="w-6 h-6 text-gray-200" />
          <span className="text-gray-200 font-semibold">Connect</span>
        </Dialog.Trigger>

        {isOpen && (
          <DiscordModal 
            adId={ad.id}
            handleCloseModal={handleCloseModal}
            twitchId={ad.twitchId}
          />
        )}
      </Dialog.Root>
    </div>
  )
}