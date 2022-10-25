import { GameController } from "phosphor-react";
import { AdType } from "../redux/features/types"
import { AdInfo } from "./AdInfo";

interface AdCardProps{
  ad: AdType;
}

export function AdCard({ ad }: AdCardProps){
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

  return(
    <div className="bg-duosy-black-400 rounded p-4 flex flex-col items-start border-t-2 border-duosy-violet-400 gap-3">
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

      <button className="inline-flex items-center mx-auto bg-duosy-red-400 py-2 px-4 rounded mt-2 gap-2 hover:bg-duosy-red-500 transition-colors">
        <GameController className="w-6 h-6 text-gray-200" />
        <span className="text-gray-200 font-semibold">Connect</span>
      </button>
    </div>
  )
}