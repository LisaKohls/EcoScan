import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import useAuth from '../../../hooks/useAuth';
import {
  ChangeEvent,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import ButtonPrimary from '../../../components/buttons/ButtonPrimary';
import HeaderContext from '../../../contexts/HeaderProvider';
import { FaSignOutAlt } from 'react-icons/fa';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { AxiosResponse } from 'axios';
import { Product } from '../../../interfaces/IProduct';
import ProductContainer from '../../productcontainer/ProductContainer';
import profilePlaceholder from '../../../assets/profile_placeholder.webp';
import {
  getFavorites,
  getProfilePicture,
  getUserInfo,
} from '../../../services/userService';
import ButtonAddProduct from '../../../components/buttons/ButtonAddProduct';
import LoadingAnimation from '../../../components/loadinganimation/LoadingAnimation';

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const Profile: FC = (): ReactElement => {
  const auth = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const axiosPrivate = useAxiosPrivate();
  const { setHeaderOptions } = useContext(HeaderContext);
  const [imgData, setImgData] = useState<string>('');

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
    const products = await getFavorites(axiosPrivate);
    setProducts(products);
  }, [axiosPrivate]);

  useEffect(() => {
    fetchOwnProducts();
  }, [fetchOwnProducts]);

  const fetchOwnUser = useCallback(async () => {
    const myUser = await getUserInfo(axiosPrivate);
    setUser(myUser);
  }, [axiosPrivate]);

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
        fetchProfilePicture();
      })
      .catch(err => console.error(err));
  };

  const fetchProfilePicture = useCallback(async () => {
    const image = await getProfilePicture(axiosPrivate);
    if (image) {
      setImgData(image);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    fetchProfilePicture();
  }, [fetchProfilePicture]);

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
        <button
          className="focus:outline-none"
          onClick={() =>
            document.getElementById('profile-picture-upload')?.click()
          }
        >
          <img
            src={imgData !== '' ? imgData : profilePlaceholder}
            alt="profile_photo"
            className="w-24 h-24 border-2 border-gray-400 rounded-full mr-4"
          />
        </button>
        <input
          id="profile-picture-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleProfilePictureUpload}
        />
        <div>
          {user ? (
            <>
              <h1 className="text-xl font-medium">{user.username}</h1>
              <h2 className="text-base font-light mt-2">{user.email}</h2>
            </>
          ) : (
            <LoadingAnimation />
          )}
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
          <ButtonAddProduct />
        </div>
      )}
    </div>
  );
};

export default Profile;
