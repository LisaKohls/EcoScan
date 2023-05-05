import React, { useState } from 'react';
import axios from 'axios';
import { HiHome, HiLibrary, HiSearch } from 'react-icons/hi';

const ProtectedPage: React.FC = () => {
  const [barcodeNumber, setBarcodeNumber] = useState('');

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
    <div className="min-h-screen bg-green-100">
      <header className="p-4 bg-green-600 text-white text-center text-xl">
        EcoScan
      </header>
      <div className="p-4">
        <input
          type="text"
          placeholder="Enter barcode number"
          value={barcodeNumber}
          onChange={e => setBarcodeNumber(e.target.value)}
          className="w-full p-2 bg-white text-black border-2 border-green-400 rounded-md"
        />
      </div>
      <div className="p-4 bg-black h-56 rounded-md"></div>
      <nav className="fixed bottom-0 left-0 right-0 p-4 bg-green-600 flex items-center justify-between">
        <div className="flex flex-col items-center text-white">
          <HiLibrary className="text-2xl" />
          <span>Favorites</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <HiSearch className="text-2xl" />
          <span>Scan</span>
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
