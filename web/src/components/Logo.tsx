import { cn } from '../utils/className';

interface LogoProps{
  isSmall?: boolean;
}

export function Logo({isSmall}: LogoProps){
  return(
    <h1 className={cn("text-5xl font-black  text-center bg-gradient-to-r from-duosy-blue-400 to-duosy-violet-400 w-fit text-transparent bg-clip-text", 
      isSmall ? '' : 'md:text-7xl mx-auto mb-4 md:mb-8')}
    >
      Duosy
    </h1>
  )
}