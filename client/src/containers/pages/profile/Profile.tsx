import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import useAuth from '../../../hooks/useAuth';
import {
  ReactElement,
  FC,
  useContext,
  useEffect,
  useState,
  useCallback,
  ChangeEvent, useRef,
} from 'react';
import ButtonPrimary from '../../../components/buttons/ButtonPrimary';
import HeaderContext from '../../../contexts/HeaderProvider';
import { FaSignOutAlt } from 'react-icons/fa';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios, {AxiosResponse} from 'axios';
import { Product } from '../../../interfaces/IProduct';
import ProductContainer from '../../productcontainer/ProductContainer';
import profilePlaceholder from '../../../assets/profile_placeholder.webp'

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
}

const FAVORITES_URL = '/api/product/personal';
const OWN_USER_URL = '/api/users/me';
const Profile: FC = (): ReactElement => {
  const auth = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [products, setProducts] = useState<Product[]>([]);
  const imgRef = useRef<HTMLImageElement>(null)
  const [user, setUser] = useState<User>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    img: '',
  });
  const axiosPrivate = useAxiosPrivate();
  const { setHeaderOptions } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderOptions({
      title: 'Profile',
      backButton: false,
      rightIcon: (
        <FaSignOutAlt onClick={() => signOut()} className="cursor-pointer" />
      ),
    });
  }, []);

  const fetchOwnProducts = useCallback(async () => {
    try {
      const response = await axiosPrivate.get<Product[]>(FAVORITES_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      setProducts(response.data);
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate]);

  const fetchOwnUser = useCallback(async () => {
    try {
      const response = await axiosPrivate.get<User>(OWN_USER_URL);

      setUser(prev => ({
        ...prev,
        ...response.data,
      }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate]);

  useEffect(() => {
    fetchOwnProducts();
  }, [fetchOwnProducts]);

  useEffect(() => {
    fetchOwnUser();
  }, [fetchOwnUser]);

  const handleProfilePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    axiosPrivate
      .post('/api/users/me/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.data.img) {
          setUser(prev => ({ ...prev, img: response.data.img }));
        }
      })
      .catch(err => console.error(err));
  };

  const [imgData, setImgData] = useState<string>('');
  const getProfilePicture = async () => {
    try {
      const res: AxiosResponse = await axiosPrivate.get('/api/users/me/profile-picture', { responseType: 'arraybuffer' });
      const base64 = btoa(
          new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
          ),
      );
      setImgData(`data:image/jpeg;base64,${base64}`);
      console.log(`data:image/jpeg;base64,${base64}`)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProfilePicture();
  }, [user.img]);

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  const addProduct = () => {
    // Implementation of adding a new product
    console.log('Add product');
  };

  return (
    <div className="pb-28">
      <div className="flex flex-row items-center justify-start p-4 border">
        <img
          src={imgData !== '' ? imgData : profilePlaceholder }
          alt="profile_photo"
          className="w-24 h-24 border-2 border-gray-400 rounded-full mr-4"
          onClick={() =>
            document.getElementById('profile-picture-upload')?.click()
          }
        />
        <input
          id="profile-picture-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleProfilePictureUpload}
        />
        <div>
          <h1 className="text-xl font-medium">{user.username}</h1>
          <h2 className="text-base font-light mt-2">{user.email}</h2>
        </div>
      </div>
      <h1 className="p-4 text-xl font-medium mt-8">Added Products</h1>
      {products.length > 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <ProductContainer products={products} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <p>You haven&apos;t added any products yet.</p>
          <ButtonPrimary onClick={addProduct}>Add Product</ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default Profile;
