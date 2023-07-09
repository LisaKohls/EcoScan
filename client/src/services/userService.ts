import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Product } from '../interfaces/IProduct';

// TODO: exclude from her (put in request/response types)
interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const getFavorites = async (
  axiosInstance: AxiosInstance
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<Product[]>(
      '/api/products/personal'
    );
    return response.data;
  } catch (err) {
    console.error(
      'Error occurred: ',
      axios.isAxiosError(err)
        ? err.response?.data
        : 'An unknown error occurred: ',
      err
    );
    return [];
  }
};

export const getUserInfo = async (
  axiosInstance: AxiosInstance
): Promise<User | null> => {
  try {
    const response = await axiosInstance.get<User>('/api/users/me');
    return response.data;
  } catch (err) {
    console.error(
      'Error occurred: ',
      axios.isAxiosError(err)
        ? err.response?.data
        : 'An unknown error occurred: ',
      err
    );
    return null;
  }
};

export const getProfilePicture = async (
  axiosInstance: any
): Promise<string | null> => {
  try {
    const res: AxiosResponse = await axiosInstance.get(
      '/api/users/me/profile-picture',
      { responseType: 'arraybuffer' }
    );
    const base64 = btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    //console.error(error);
    return '';
  }
};
