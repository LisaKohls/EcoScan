import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';
import { AxiosError } from 'axios';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage('persist', true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        console.warn('ReFREsh START');
        await refresh();
      } catch (err) {
        const e = err as AxiosError;
        console.warn('ReFREsh ERRERERERER', e.code);
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [auth.accessToken, persist, refresh]);

  return (
    <>{(!persist && isLoading) || isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
