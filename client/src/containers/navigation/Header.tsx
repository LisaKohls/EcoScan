import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  const locationPage = location.pathname;
  let title;
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

  if (locationPage == '/searchForProduct') {
    title = 'Search for product';
  } else if (locationPage == '/') {
    title = 'Scan a product';
  } else if (locationPage == '/favorites') {
    title = 'Favorites';
  } else if (locationPage.startsWith('/product')) {
    title = 'Productinfo';
  } else if (locationPage == '/appInfo') {
    title = 'More information';
  } else {
    title = 'Profile';
  }

  const renderQuestionMark = (
    <button className="fixed top-8 right-8" onClick={() => navigate('appInfo')}>
      <FontAwesomeIcon icon={faQuestionCircle} />
    </button>
  );

  if (
    locationPage == '/searchForProduct' ||
    locationPage.startsWith('/product') ||
    locationPage == '/appInfo'
  ) {
    return (
      <>
        <header className="p-8 bg-primary-color text-white text-right text-xl md:px-20 lg:px-40">
          <button
            className="fixed top-0 left-0 ps-4 pt-8 flex"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft className="inline-block text-white text-2xl hover:text-secondary-color" />
          </button>
          <h1 className="flex-1 text-center text-xl text-white font-normal ">
            {title}
          </h1>
          {locationPage.startsWith('/product') ? renderQuestionMark : ''}
        </header>
      </>
    );
  } else if (!isMobile) {
    return (
      <div className="text-right">
        <header className="p-8 bg-primary-color text-white text-right text-xl md:px-20 lg:px-40">
          <div className="flex space-x-6">
            <button
              className="text-xl font-normal focus:underline hover:text-secondary-color transition ease-in-out duration-300"
              onClick={() => navigateToPage('')}
            >
              Scan Product
            </button>
            <button
              className="flex-col text-xl font-normal focus:underline hover:text-secondary-color transition ease-in-out duration-300"
              onClick={() => navigateToPage('favorites')}
            >
              Favorites
            </button>
            <button
              className="flex-col text-xl font-normal focus:underline hover:text-secondary-color transition ease-in-out duration-300"
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
        <h1 className="text-center text-xl font-normal ">{title}</h1>
      </header>
    );
  }
};

export default Header;
