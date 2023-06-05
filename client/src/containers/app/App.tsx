import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegistrationPage from '../pages/auth/RegistrationPage';
import MainPage from '../pages/main/MainPage';
import ProductInfo from '../pages/productinfo/ProductInfo';
import Profile from '../pages/profile/Profile';
import Favorites from '../pages/favorites/Favorites';
import SearchForProduct from '../pages/searchproduct/SearchForProduct';
import LayoutAuthed from '../layouts/authed/LayoutAuthed';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />

      {/* TODO: replace with real auth */}
      <Route path="/" element={<LayoutAuthed />}>
        <Route index element={<MainPage />} />
        <Route path="/productInfo" element={<ProductInfo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/searchForProduct" element={<SearchForProduct />} />
      </Route>
    </Routes>
  );
};

export default App;
