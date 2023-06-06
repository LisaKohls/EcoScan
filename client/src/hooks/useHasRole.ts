import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import IJWTAccessToken from '../interfaces/IJWTAccessToken';
import useAuth from './useAuth';

type Props = {
  allowedRoles: number[];
};

const useHasRole = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    if (auth === null || !auth.accessToken || auth.accessToken === '') {
      setHasRole(false);
      return;
    }

    console.log('LOL');
    const accessToken = auth.accessToken;
    const decoded = jwt_decode<IJWTAccessToken>(accessToken) || null;
    const roles = decoded.UserInfo.roles;

    const found = roles.some(role => allowedRoles.includes(role));
    console.log('FOUND', found);
    setHasRole(found);
  }, [allowedRoles, auth]);

  return hasRole;
};

export default useHasRole;
