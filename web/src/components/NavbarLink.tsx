import { LiHTMLAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarLinkProps extends LiHTMLAttributes<HTMLLIElement>{
  title: string;
  linkTo: string;
}

export function NavbarLink({ title, linkTo, ...rest }: NavbarLinkProps){
  const location = useLocation();

  const currentPage = 
    location.pathname === linkTo
      ? 'bg-duosy-red-500 text-white md:bg-transparent md:border-duosy-red-500'
      : 'text-duosy-blue-400';

  return(
    <li className={`w-full md:w-fit md:h-full flex items-center md:py-0  hover:text-white hover:bg-duosy-red-500 focus-within:bg-duosy-red-500 md:hover:bg-transparent md:border-b-2 md:border-transparent md:hover:border-duosy-red-500 md:focus-within:bg-transparent md:focus-within:border-duosy-red-500 focus-within:text-white transition-colors text-lg cursor-pointer ${currentPage}`} {...rest}>
      <Link to={linkTo} className="h-full py-2 flex flex-1 items-center justify-center outline-none focus:shadow-none">{title}</Link>
    </li>
  )
}