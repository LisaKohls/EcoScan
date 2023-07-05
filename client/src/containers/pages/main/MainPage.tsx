import ButtonPrimary from '../../../components/buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import Introduction from '../../../components/introduction/Introduction';
import EcoScan from '../../../components/logos/EcoScan';
import { useContext, useEffect } from 'react';
import HeaderContext from '../../../contexts/HeaderProvider';
import useAuth from '../../../hooks/useAuth';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { setHeaderOptions } = useContext(HeaderContext);
  const { auth } = useAuth();

  useEffect(() => {
    setHeaderOptions({
      title: `Welcome, ${auth.username}`,
      backButton: false,
      rightIcon: null,
    });
  }, [setHeaderOptions]);

  const navigateToPage = (page: string) => {
    navigate('/' + page);
  };

  return (
    <>
      <EcoScan />
      <Introduction />
      <ButtonPrimary onClick={() => navigateToPage('searchForProduct')}>
        Type in manually
      </ButtonPrimary>
    </>
  );
};

export default MainPage;
