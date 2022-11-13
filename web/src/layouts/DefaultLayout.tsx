import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { List, X } from 'phosphor-react';

import { Navbar } from '../components';

export function DefaultLayout(){
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState('');

  function handleCloseNavbar(){
    setIsNavbarOpen(false);
    setCloseAnimation('animate-slideleft');
  }

  return(
    <div className="flex flex-col h-full">
      <Navbar 
        isOpen={isNavbarOpen} 
        closeAnimation={closeAnimation}
        handleCloseNavbar={handleCloseNavbar} 
      />
      <div className="absolute top-4 right-1 z-10 md:hidden">
        <button
          type="button"
          onClick={() => {
            setIsNavbarOpen((prev) => !prev);
            setCloseAnimation('animate-slideleft');
          }}
        >
          {isNavbarOpen ? (
            <X className="w-8 h-8 text-duosy-red-400" />
          ) : (
            <List className="w-8 h-8 text-duosy-red-400" />
          )}
        </button>
      </div>
      <div className="flex-1 bg-blackGradient overflow-auto hide-scrollbar">
        <Outlet />
      </div>
    </div>
  )
}