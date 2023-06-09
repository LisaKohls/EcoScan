import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LayoutAuthed from '../containers/layouts/authed/LayoutAuthed';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === null || auth.accessToken === '') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Layout For Authed Users:
  const authedLayout = (
    <LayoutAuthed>
      <Outlet />
    </LayoutAuthed>
  );

  return auth.accessToken !== '' ? (
    authedLayout
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
