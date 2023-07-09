import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './containers/app/App';
import { AuthProvider } from './contexts/AuthProvider';
import { HeaderProvider } from './contexts/HeaderProvider';

// IMPORTANT: Removed <React.StrictMode> because of persistent login!
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <HeaderProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </HeaderProvider>
    </AuthProvider>
  </BrowserRouter>
);
