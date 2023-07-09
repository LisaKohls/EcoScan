import axios from '../api/axiosAPI';
import useAuth from './useAuth';

const URL_REFRESH = 'api/auth/refresh';
const useRefreshToken = (): (() => Promise<string>) => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const response = await axios.get(URL_REFRESH, {
      withCredentials: true,
    });
    setAuth(prev => ({
      ...prev,
      accessToken: response.data.accessToken,
    }));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
