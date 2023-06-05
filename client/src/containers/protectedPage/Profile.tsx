import React from 'react';
import { ProfileProps } from './ProfileProps';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/BottomNavBar';

const Profile: React.FC<ProfileProps> = props => {
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-orange-50-50">
      <div className="bg-lime-100 bg-text-black rounded-b-3xl flex pt-8 pb-8">
        <img
          src={props.img}
          alt={props.name}
          className="w-32 h-32 border ms-4 me-4 border-gray-400 rounded-full"
        />
        <div className="flex flex-col justify-center">
          <div className="ml-8">
            <h1 className="text-left text-xl font-normal">{props.name}</h1>
            <h2 className="text-left text-xl font-normal pt-2">
              {props.email}
            </h2>
          </div>
          <div className="flex justify-center">
            <button
              className="text-white bg-emerald-800 rounded-md text-center mt-8 mb-8 p-2 pl-6 pr-6"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-left text-xl font-normal mt-8 ml-6">
        Added Products
      </h1>

      <BottomNavBar />
    </div>
  );
};

export default Profile;
