import React from 'react';
import BottomNavBar from '../../components/BottomNavBar';
import Header from '../../components/Header';
import CardProductView from '../../components/cardProductView';
import img from './testResources/testImgRiegel.png';

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
      <div className="grid grid-cols-2 gap-4 p-4">
        <CardProductView img={img} index={40} name="Riegel" />
        <CardProductView img={img} index={40} name="Riegel" />
        <CardProductView img={img} index={40} name="Riegel" />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Favorites;
