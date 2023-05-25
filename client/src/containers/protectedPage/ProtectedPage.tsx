import React, { useState } from 'react';
import axios from 'axios';
import BottomNavBar from '../../components/BottomNavBar';
import Header from '../../components/Header';
const ProtectedPage: React.FC = () => {
  const [barcodeNumber, setBarcodeNumber] = useState('');

  const searchForBarcode = () => {
    window.location.href = '/ProductInfo';
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
      <Header title="Eco Scan" />
      <div className="p-4">
        <input
          className="w-full p-2 bg-white text-black border-2 border-green-400 rounded-md"
          type="text"
          placeholder="Enter barcode number"
          value={barcodeNumber}
          onChange={e => setBarcodeNumber(e.target.value)}
        />
      </div>
      <div
        className="p-4 bg-black m-3 h-56 rounded-md"
        role="button"
        tabIndex={0}
        onClick={() => searchForBarcode()}
        onKeyDown={event => {
          console.log(event.key);
          console.log('clicked black rectangle');
        }}
      ></div>
      <BottomNavBar />
    </div>
  );
};

export default ProtectedPage;