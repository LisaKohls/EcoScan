import React, { useEffect, useRef } from 'react';
import ButtonPrimary from '../../../components/buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import EcoScan from "../../../components/logos/EcoScan";
import Introduction from "../../../components/introduction/Introduction";

const MainPage: React.FC = () => {
  const navigate = useNavigate();


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
