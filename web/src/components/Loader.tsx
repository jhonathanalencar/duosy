interface LoaderProps{
  text?: string;
}

export function Loader({ text }: LoaderProps){
  return(
    <div className="w-full flex flex-col items-center gap-2">
      <div className="flex item-center gap-4 mt-8">
        <div className="w-4 h-4 rounded-full bg-[#e43f6f] animate-ball" />
        <div className="w-4 h-4 rounded-full bg-[#e43f6f] animate-[ball_0.5s_0.1s_ease_infinite_alternate]" />
        <div className="w-4 h-4 rounded-full bg-[#e43f6f] animate-[ball_0.5s_0.2s_ease_infinite_alternate]" />
      </div>
      <span className="text-xl font-black text-gray-200 capitalize">
        {`${text ?? 'Loading...'}`}
      </span>
    </div>
  )
}