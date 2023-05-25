import React from 'react';
import { ProfileProps } from './ProfileProps';
import { HiLibrary, HiHome } from 'react-icons/hi';
import { IoIosQrScanner } from 'react-icons/Io';
import { useNavigate } from 'react-router-dom';


const Profile: React.FC<ProfileProps> = props => {
    const navigate = useNavigate();

    const navigateToProductInfo = () => {
        navigate('/productInfo');
        };

    const naviagteToProfile = () => {
        navigate('/profile');
        };

    
    
    
    return (
        <div className="min-h-screen bg-orange-50-50">
          <div className="bg-lime-100 bg- text-black rounded-b-3xl">
            <h1 className="text-left text-xl font-normal p-8 pl-24 ">
                {props.name}
            </h1>
            <h2 className="text-left text-xl font-normal p-8 pl-24 ">
                {props.email}
            </h2>
            <button
            className="text-white bg-emerald-800 rounded-md text-center  mt-8 p-2"
            onClick={() => navigate(-1)}
            >
                Logout
            </button>
          </div>
          <nav className="fixed bottom-4 left-1 right-1 m-1 p-4 bg-lime-100 flex items-center justify-between rounded-lg">
            <div className="flex flex-col items-center text-balck">
            <HiLibrary className="text-2xl" />
            <span>Favorites</span>
            </div>
            <div
            className="flex flex-col items-center text-white"
            role="button"
            tabIndex={0}
            id="arrowIcon"
            onClick={() => navigateToProductInfo()}
            onKeyDown={event => {
                console.log(event.key);
            }}
            >
            <IoIosQrScanner className="absolute bottom-6 rounded-full w-16 h-16  bg-emerald-800 p-4" />
            </div>
            <div className="flex flex-col items-center text-black" onClick={() => naviagteToProfile()}>
            <HiHome className="text-2xl" />
            <span>Profile</span>
            </div>
      </nav>
        </div>
      );
};

export default Profile;