import ButtonPrimary from '../../../components/buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import EcoScan from '../../../components/logos/EcoScan';
import { useContext, useEffect } from 'react';
import HeaderContext from '../../../contexts/HeaderProvider';
import useAuth from '../../../hooks/useAuth';
import { BarcodeScanner } from '../../../components/barcodescanner/BarcodeScanner';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { setHeaderOptions } = useContext(HeaderContext);
  const { auth } = useAuth();

  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();
    let greeting;

    if (currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    setHeaderOptions({
      title: greeting,
      backButton: false,
      rightIcon: null,
    });
  }, [setHeaderOptions, auth]);

  const navigateToPage = (page: string) => {
    navigate('/' + page);
  };

  const handleScanned = ({ text }: { text: string }) => {
    navigate(`/products/${text}`);
  };

  return (
    <div className="pb-28">
      <EcoScan />
      <BarcodeScanner onResult={handleScanned} />
      <ButtonPrimary onClick={() => navigateToPage('search')}>
        Type in manually
      </ButtonPrimary>
    </div>
  );
};

export default MainPage;
