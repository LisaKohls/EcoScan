import { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { IoIosQrScanner } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function BottomNavBar() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('');

  const navigateToPage = (page: string) => {
    setActivePage(page);
    navigate('/' + page);
  };

  const pages = {
    favorites: {
      Icon: AiFillHeart,
      name: 'Favorites',
    },
    '': {
      Icon: IoIosQrScanner,
      name: 'Scan',
    },
    profile: {
      Icon: BsPersonFill,
      name: 'Profile',
    },
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4 bg-primary-color flex items-center justify-around md:hidden lg:hidden">
      {Object.entries(pages).map(([page, { Icon, name }]) => (
        <button
          key={page}
          className={`flex flex-col items-center text-${
            activePage === page ? 'secondary-color' : 'white'
          } hover:text-secondary-color`}
          onClick={() => navigateToPage(page)}
        >
          <Icon className={`text-2xl`} />
          <span>{name}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavBar;
