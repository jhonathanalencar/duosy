import { Logo } from "./Logo";
import { NavbarLink } from "./NavbarLink";

interface NavbarProps{
  isOpen: boolean;
  closeAnimation: string;
  handleCloseNavbar: () => void;
}

export function Navbar({ isOpen, closeAnimation, handleCloseNavbar }: NavbarProps){
  return(
    <header className={`w-full h-full md:h-20 flex items-center absolute z-10 md:relative md:translate-x-0 md:animate-none bg-gray-900 shadow-sm ${isOpen ? 'translate-x-0 animate-slideright' : `-translate-x-full ${closeAnimation}`}`}>
      <div className="w-full max-w-6xl h-full mx-auto px-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-16 md:gap-0">
        <Logo isSmall={true} />
        <nav className="w-full md:w-fit md:h-full flex items-center flex-col-reverse md:flex-row gap-8 ">
          <ul className="w-full md:w-fit md:h-full flex flex-col md:flex-row items-center gap-0 md:gap-4">
            <NavbarLink 
              onClick={handleCloseNavbar} 
              title="Home" 
              linkTo="/" 
            />
            <NavbarLink 
              onClick={handleCloseNavbar} 
              title="Games"
              linkTo="/games" 
            />
            <NavbarLink 
              onClick={handleCloseNavbar} 
              title="Find" 
              linkTo="/find" 
            />
          </ul>
          <div className="w-16 h-16 md:w-10 md:h-10 rounded-full aspect-square bg-duosy-beige-400">
            
          </div>
        </nav>
      </div>
    </header>
  )
}