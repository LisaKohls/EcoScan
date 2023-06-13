// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { HiHome, HiLibrary } from 'react-icons/hi';
import { IoIosQrScanner } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function BottomNavBar() {
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    navigate('/' + page);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4 bg-primary-color flex items-center justify-between md:hidden lg:hidden">
      <button
        className="flex flex-col items-center text-white hover:text-secondary-color"
        onClick={() => navigateToPage('favorites')}
      >
        <HiLibrary className="text-2xl" />
        <span>Favorites</span>
      </button>
      <button
        className="flex flex-col items-center text-grey-green "
        onClick={() => navigateToPage('')}
      >
        <IoIosQrScanner className="absolute bottom-6 rounded-full w-16 h-16 bg-white p-4 hover:bg-secondary-color " />
      </button>
      <button
        className="flex flex-col items-center text-white hover:text-secondary-color"
        onClick={() => navigateToPage('profile')}
      >
        <HiHome className="text-2xl" />
        <span>Profile</span>
      </button>
    </nav>
  );
}

export default BottomNavBar;
