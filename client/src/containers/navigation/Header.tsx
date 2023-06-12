import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

interface Title {
  title: string;
}

const Header: React.FC<Title> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);

  const navigateToPage = (page: string) => {
    navigate('/' + page);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (location.pathname == '/searchForProduct' || location.pathname == '/productInfo' ) {
    return (
      <div className="flex p-11 bg-primary-color">
        <button
          className="fixed top-0 left-0 ps-4 pt-8"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="inline-block text-white text-2xl" />
        </button>
      </div>
    );
  } else if (!isMobile) {
    return (
      <div className="text-right">
        <header className="p-8 bg-primary-color text-white text-right text-xl md:px-20 lg:px-40">
          <div className="flex space-x-6">
            <button
              className="text-xl font-normal focus:underline"
              onClick={() => navigateToPage('')}
            >
              Scan Product
            </button>
            <button
              className="flex-col text-xl font-normal focus:underline"
              onClick={() => navigateToPage('favorites')}
            >
              Favorites
            </button>
            <button
              className="flex-col text-xl font-normal focus:underline"
              onClick={() => navigateToPage('profile')}
            >
              Profile
            </button>
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <header className="p-8 bg-primary-color text-white text-center text-xl  md:hidden lg:hidden">
        <h1 className="text-center text-xl font-normal ">{props.title}</h1>
      </header>
    );
  }
};

export default Header;
