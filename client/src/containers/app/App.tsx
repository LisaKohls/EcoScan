import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegistrationPage from '../pages/auth/RegistrationPage';
import ProductInfo from '../pages/productinfo/ProductInfo';
import Profile from '../pages/profile/Profile';
import Favorites from '../pages/favorites/Favorites';
import SearchForProduct from '../pages/searchproduct/SearchForProduct';
import RequireAuth from '../RequireAuth';
import PersistLogin from '../PersistentLogin';
import MoreInfo from '../pages/moreinfo/MoreInfo';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      {/* TODO: replace with real auth */}
      <Route element={<PersistLogin />}>
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<SearchForProduct />} />
          <Route path="/product/:barcode" element={<ProductInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/more-info" element={<MoreInfo />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
