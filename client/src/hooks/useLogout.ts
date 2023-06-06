import axios from '../api/axiosAPI';
import useAuth from './useAuth';

const URL_LOGOUT = 'api/auth/logout';
const useLogout = (): (() => Promise<void>) => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({
      username: '',
      accessToken: '',
    });
    try {
      /*const response = */ await axios(URL_LOGOUT, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
