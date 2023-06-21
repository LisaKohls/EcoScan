import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import useAuth from '../../../hooks/useAuth';
import { ReactElement, FC } from 'react';
import ButtonPrimary from '../../../components/buttons/ButtonPrimary';

interface Product {
  id: string;
  name: string;
  price: number;
}

const Profile: FC = (): ReactElement => {
  const exampleData = {
    email: 'max.musterman@examle.com',
    img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  };

  const auth = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  // Mock data - replace it with real data
  const products: Product[] = [];

  const addProduct = () => {
    // Implementation of adding a new product
    console.log('Add product');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-lime-100 p-4 rounded-bl-3xl">
        <img
          src={exampleData.img}
          alt="profile_photo"
          className="w-24 h-24 border-2 border-gray-400 rounded-full mt-4"
        />
        <h1 className="text-center text-xl font-medium mt-4">
          {auth.auth.username}
        </h1>
        <h2 className="text-center text-base font-light mt-2">
          {exampleData.email}
        </h2>
        <div className="w-full flex justify-center mt-4">
          <button onClick={() => signOut()} className="w-full sm:w-auto">
            Logout
          </button>
        </div>
      </div>
      <h1 className="text-center text-xl font-medium mt-8">Added Products</h1>
      {products.length > 0 ? (
        products.map((product: Product) => (
          <div
            key={product.id}
            className="flex justify-between items-center p-4 bg-gray-100 m-2 rounded"
          >
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="mb-4">You haven&apos;t added any products yet.</p>
          <ButtonPrimary onClick={addProduct}>Add Product</ButtonPrimary>
        </div>
      )}
    </>
  );
};

export default Profile;
