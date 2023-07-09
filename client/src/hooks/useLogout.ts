import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const URL_LOGOUT = '/api/auth/logout';
const useLogout = (): (() => Promise<void>) => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({
      username: '',
      accessToken: '',
    });
    try {
      /*const response = */ await axiosPrivate(URL_LOGOUT, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
