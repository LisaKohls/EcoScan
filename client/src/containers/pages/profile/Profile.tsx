import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";

const Profile = () => {
  const exampleData = {
    name: 'Max Mustermann',
    email: 'max.mustermal@examle.com',
    img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  };

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <div className="bg-lime-100 bg-secondary-color rounded-b-3xl flex pt-8 pb-8">
        <img
          src={exampleData.img}
          alt={exampleData.name}
          className="w-32 h-32 border ms-4 me-4 border-gray-400 rounded-full"
        />
        <div className="flex flex-col justify-center">
          <div className="ml-8">
            <h1 className="text-left text-xl font-normal">
              {exampleData.name}
            </h1>
            <h2 className="text-left text-xl font-normal pt-2">
              {exampleData.email}
            </h2>
          </div>
          <div className="flex justify-center">
            <ButtonPrimary onClick={() => signOut()} >
              Logout
            </ButtonPrimary>
          </div>
        </div>
      </div>

      <h1 className="text-left text-xl font-normal mt-8 ml-6">
        Added Products
      </h1>
    </>
  );
};

export default Profile;
