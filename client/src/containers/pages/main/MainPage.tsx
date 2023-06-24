import ButtonPrimary from '../../../components/buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import Introduction from '../../../components/introduction/Introduction';
import LeaveLogo from '../../../components/logos/LeaveLogo';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    navigate('/' + page);
  };

  return (
    <>
      <LeaveLogo sizing="w-1/2 sm:w-1/6 h-auto" />
      <Introduction />
      <ButtonPrimary onClick={() => navigateToPage('searchForProduct')}>
        Type in manually
      </ButtonPrimary>
    </>
  );
};

export default MainPage;
