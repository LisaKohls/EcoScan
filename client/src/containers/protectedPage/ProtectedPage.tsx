// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import BottomNavBar from '../../components/BottomNavBar';
import Header from '../../components/Header';
const ProtectedPage: React.FC = () => {
  const openPage = url => {
    window.location.href = url;
  };
  /*
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
  };*/

  return (
    <div className="min-h-screen bg-lime-50 ">
      <Header title="Eco Scan" />
      <h2 className="m-3 text-center">
        Align the barcode within the frame to scan
      </h2>
      <div
        className="p-4 bg-black m-20 h-56 rounded-md relative"
        role="button"
        tabIndex={0}
        onClick={() => openPage('/productInfo')}
        onKeyDown={event => {
          console.log(event.key);
          console.log('clicked black rectangle');
        }}
      >
        <div className="absolute inset-4 border border-white rounded-md"></div>
      </div>
      <div className="flex justify-center">
        <button
          className=" center-button hover:bg-green-900 text-white hover:text-white rounded-full bg-grey-green p-3 mt-2"
          onClick={() => openPage('/searchForProduct')}
          onKeyDown={event => {
            console.log(event.key);
            console.log('open search page');
          }}
        >
          Type in manually
        </button>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default ProtectedPage;
