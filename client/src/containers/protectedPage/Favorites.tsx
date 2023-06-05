import React from 'react';
import BottomNavBar from '../../components/BottomNavBar';
import Header from '../../components/Header';

const Favorites: React.FC = () => {
  return (
    <div className="min-h-screen bg-lime-50 ">
      <Header title="Favorites" />
      <div className="p-4">
        <input
          className="w-full p-2 bg-white text-black border-2 border-green-400 rounded-md"
          type="text"
          placeholder="Search for favorites"
        />
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Favorites;
