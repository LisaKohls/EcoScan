import React from 'react';
import { HiHome, HiLibrary } from 'react-icons/hi';
import { IoIosQrScanner } from 'react-icons/Io';

function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4 bg-grey-green flex items-center justify-between">
      <div className="flex flex-col items-center text-white hover:text-black">
        <HiLibrary className="text-2xl" />
        <span>Favorites</span>
      </div>
      <div className="flex flex-col items-center text-grey-green hover:text-black">
        <IoIosQrScanner className="absolute bottom-6 rounded-full w-16 h-16  bg-white p-4 " />
      </div>
      <div className="flex flex-col items-center text-white hover:text-black">
        <HiHome className="text-2xl" />
        <span>Profile</span>
      </div>
    </nav>
  );
}

export default BottomNavBar;
