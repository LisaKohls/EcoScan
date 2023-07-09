import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import useAuth from '../../../hooks/useAuth';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

import {
  ChangeEvent,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import HeaderContext from '../../../contexts/HeaderProvider';
import { FaSignOutAlt } from 'react-icons/fa';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
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
  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState(false);
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');

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
    setLoading(true);
    const products = await getFavorites(axiosPrivate);
    setProducts(products);
    setLoading(false);
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


  const editName = () => {
    if (firstName != null) {
      const newUser: User = {
        username: user?.username || '',
        firstName: firstName,
        lastName: lastName,
        email: user?.email || '',
      };
      setUser(newUser);
    }
    setInput(false);
  };

  return (
    <div className="pb-28 mx-2 lg:mx-20">
      <div className="flex flex-row  items-center justify-start p-4 border">
        <button
          className="focus:outline-none sticky"
          onClick={() =>
            document.getElementById('profile-picture-upload')?.click()
          }
        >
          <MdAddPhotoAlternate className="absolute w-7 h-7 ml-20 top-[4rem] z-10 text-gray-400 " />
          <img
            src={imgData !== '' ? imgData : profilePlaceholder}
            alt="profile_photo"
            className="relative w-24 h-24 border-2 border-gray-400 rounded-full mr-8"
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
              {!input ? (
                <>
                  <div className="flex">
                    <h1 className="flex text-xl font-medium">
                      {user.lastName == 'Doe' || user.lastName == ''
                        ? user.username
                        : `${user.firstName} ${user.lastName}`}
                    </h1>
                    <button
                      className="mx-margin-elements"
                      onClick={() => setInput(true)}
                    >
                      <AiOutlineEdit />
                    </button>
                  </div>
                  <h2 className="text-base font-light mt-2">{user.email}</h2>
                </>
              ) : (
                <div className="block md:flex ">
                  <input
                    type="text"
                    placeholder="firstname"
                    className="block md:flex-1 mt-3 md:mt-0 border rounded-lg focus:outline-black p-1 w-30 mr-margin-elements"
                    id="firstName"
                    value={firstName}
                    onChange={event => setFirstname(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="lastName"
                    className="block md:flex md:flex-1 mt-3 md:mt-0 border rounded-lg focus:outline-black p-1 w-30 mr-margin-elements"
                    id="lastName"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                  />
                  <button
                    onClick={() => editName()}
                    className="md:flex md:flex-2 mt-3 md:mt-0 bg-gray-400  text-white rounded-lg p-1 hover:bg-primary-color transition ease-in-out duration-300 "
                  >
                    Save
                  </button>
                </div>
              )}
            </>
          ) : (
            <LoadingAnimation />
          )}
        </div>
      </div>
      <div className="flex ">
        <h1 className="flex flex-row-4 text-xl font-medium mt-[3rem] lg:mt-8">
          Added Products: {products.length != 0 ? products.length : 0}
        </h1>

        <div className="flex flex-1 justify-end mt-[1rem] lg:mt-0">
          <ButtonAddProduct />
        </div>
      </div>
      {products.length > 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <ProductContainer products={products} />
        </div>
      ) : isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 lg:mt-0">
          <p>You haven&apos;t added any products yet.</p>
          <p>Click on the button to add your first product</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
