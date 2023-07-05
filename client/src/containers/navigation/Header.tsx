import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import HeaderContext from '../../contexts/HeaderProvider';
import useScrollPosition from '../../hooks/useScrollPosition';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  const { title, backButton, rightIcon } = useContext(HeaderContext);
  const { scrollY } = useScrollPosition();

  const colorScheme = 'white';
  const bgScheme = 'bg-primary-color opacity-90';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigateToPage = (page: string) => {
    navigate('/' + page);
  };

  const MobileHeader = () => (
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-4 text-center text-xl flex justify-center items-center h-16 md:hidden lg:hidden transition-colors duration-200 ${bgScheme}`}
    >
      <h1 className="font-bold transition-colors duration-200 text-white">
        {title}
      </h1>
      {backButton && (
        <button
          className="absolute left-4 flex items-center transition-colors duration-200 text-white"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="text-2xl hover:text-secondary-color" />
        </button>
      )}
      {rightIcon && (
        <div className="absolute right-4 transition-colors duration-200 text-white">
          {rightIcon}
        </div>
      )}
    </header>
  );

  const DesktopHeader = () => (
    <header
      className={`p-4 text-xl flex justify-between items-center h-16 md:px-20 lg:px-40 ${bgScheme}`}
    >
      {backButton && (
        <button
          className="absolute left-4 flex items-center transition-colors duration-200 ${
            text-white"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="text-2xl hover:text-secondary-color" />
        </button>
      )}
      <div className={`flex space-x-6 text-${colorScheme}`}>
        <button
          type="button"
          className={`font-normal focus:underline transition ease-in-out duration-300 ${
            location.pathname === '/favorites'
              ? 'text-secondary-color'
              : 'hover:text-secondary-color'
          }`}
          onClick={() => navigateToPage('favorites')}
        >
          Favorites
        </button>
        <button
          type="button"
          className={`font-normal focus:underline transition ease-in-out duration-300 ${
            location.pathname === '/'
              ? 'text-secondary-color'
              : 'hover:text-secondary-color'
          }`}
          onClick={() => navigateToPage('')}
        >
          Search
        </button>
        <button
          type="button"
          className={`font-normal focus:underline transition ease-in-out duration-300 ${
            location.pathname === '/profile'
              ? 'text-secondary-color'
              : 'hover:text-secondary-color'
          }`}
          onClick={() => navigateToPage('profile')}
        >
          Profile
        </button>
        {rightIcon && (
          <div className="absolute right-4 transition-colors duration-200 text-white">
            {rightIcon}
          </div>
        )}
      </div>
    </header>
  );

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
