import { useContext, useDebugValue } from 'react';
import AuthContext, { AuthContextType } from '../contexts/AuthProvider';

const useAuth = (): AuthContextType => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, auth =>
    auth.accessToken !== '' ? 'Logged In' : 'Logged Out'
  );
  return useContext(AuthContext);
};

export default useAuth;
