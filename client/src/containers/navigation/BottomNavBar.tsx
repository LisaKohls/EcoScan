import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoScan, IoSearch } from 'react-icons/io5';
import useScrollPosition from '../../hooks/useScrollPosition';

function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const navigateToPage = (page: string) => {
    setActivePage('/' + page);
    navigate(page);
  };

  const pages = {
    '/favorites': {
      Icon: AiFillHeart,
      name: 'Favorites',
    },
    '/': {
      Icon: IoScan,
      name: 'Scan',
    },
    '/profile': {
      Icon: BsPersonFill,
      name: 'Profile',
    },
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 p-4 bg-primary-color flex items-center justify-around md:hidden lg:hidden ${
        scrollY > 0 ? 'opacity-90' : ''
      }`}
    >
      {Object.entries(pages).map(([page, { Icon, name }]) => (
        <button
          key={page}
          className={`flex flex-col items-center text-${
            activePage === page ? 'white' : 'gray-300'
          } hover:text-white`}
          onClick={() => navigateToPage(page)}
        >
          <Icon
            className={`text-2xl ${
              activePage === page ? 'text-white' : 'text-gray-400'
            }`}
          />
          <span
            className={activePage === page ? 'text-white' : 'text-gray-400'}
          >
            {name}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavBar;
