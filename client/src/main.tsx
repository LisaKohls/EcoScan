import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedPage from './containers/protectedPage/ProtectedPage';
import LoginPage from './containers/auth/LoginPage';
import RegistrationPage from './containers/auth/RegistrationPage';
import ProductInfo from './containers/protectedPage/ProductInfo';
import Profile from './containers/protectedPage/Profile';
import testImg from './containers/protectedPage/testResources/testImgRiegel.png';
import Favorites from './containers/protectedPage/Favorites';
import SearchForProduct from './containers/protectedPage/SearchForProduct';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('auth-token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/protectedPage"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productInfo"
          element={
            <ProductInfo
              img={testImg}
              name="Koro Riegel"
              socialIndex={50}
              lifetimeIndex={50}
              ecologicalIndex={20}
              waterIndex={50}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              name="Max Mustermann"
              email="max.mustermal@examle.com"
              img="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/searchForProduct" element={<SearchForProduct />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
