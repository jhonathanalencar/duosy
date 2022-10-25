interface AdInfoProps{
  title: string;
  description: string;
  textColor?: string;
  weekDays?: string[];
}

export function AdInfo({ title, description, textColor = 'text-gray-400', weekDays }: AdInfoProps){
  return(
    <div className="flex flex-col items-start gap-1 bg-duosy-black-500 p-2 w-full rounded">
      <strong className="text-gray-300 leading-none">{title}</strong>
      <span 
        title={weekDays?.join('・') ?? ''}
        className={`leading-none ${textColor}`}
      >   
        {description}
      </span>
    </div>
  )
}