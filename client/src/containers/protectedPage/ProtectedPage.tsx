import React, { useState } from 'react';
import axios from 'axios';
import { HiHome, HiLibrary } from 'react-icons/hi';
import { IoIosQrScanner } from 'react-icons/Io';
const ProtectedPage: React.FC = () => {
  const [barcodeNumber, setBarcodeNumber] = useState('');

  const searchForBarcode = () => {
    window.location.href = '/ProductInfo';
    console.log('new page');
  };

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.get(
        'http://localhost:3001/api/auth/protected',
        {
          headers: { 'x-auth-token': token },
        }
      );
      alert(response.data);
    } catch (error) {
      alert('Error fetching protected data.');
    }
  };

  return (
    <div className="min-h-screen bg-lime-50 ">
      <header className="p-4 bg-green-800 text-white text-center text-xl">
        EcoScan
      </header>
      <div className="p-4">
        <input
          className="w-full p-2 bg-white text-black border-2 border-green-400 rounded-md"
          type="text"
          placeholder="Enter barcode number"
          value={barcodeNumber}
          onChange={e => setBarcodeNumber(e.target.value)}
        />
      </div>
      <div className="p-4 bg-black m-3 h-56 rounded-md"></div>
      <nav className="fixed bottom-4 left-1 right-1 m-1 p-4 bg-green-800 flex items-center justify-between rounded-lg">
        <div className="flex flex-col items-center text-white">
          <HiLibrary className="text-2xl" />
          <span>Favorites</span>
        </div>
        <div
          className="flex flex-col items-center text-black"
          role="button"
          tabIndex={0}
          id="arrowIcon"
          onClick={() => searchForBarcode()}
          onKeyDown={event => {
            console.log(event.key);
          }}
        >
          <IoIosQrScanner className="absolute bottom-6 rounded-full w-16 h-16  bg-white p-4" />
        </div>
        <div className="flex flex-col items-center text-white">
          <HiHome className="text-2xl" />
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default ProtectedPage;
