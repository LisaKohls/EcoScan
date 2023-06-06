import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import IJWTAccessToken from '../interfaces/IJWTAccessToken';
import LayoutAuthed from './layouts/authed/LayoutAuthed';

type Props = {
  allowedRoles: number[];
};

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === null || auth.accessToken === '') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const decoded = jwt_decode<IJWTAccessToken>(auth.accessToken);
  const roles = decoded?.UserInfo?.roles;

  // Layout For Authed Users:
  const authedLayout = (
    <LayoutAuthed>
      <Outlet />
    </LayoutAuthed>
  );

  return roles?.find(role => allowedRoles.includes(role)) ? (
    authedLayout
  ) : auth.accessToken !== '' ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
