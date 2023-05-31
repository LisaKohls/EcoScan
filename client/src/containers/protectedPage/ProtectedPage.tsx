// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useRef, useEffect } from 'react';
import BottomNavBar from '../../components/BottomNavBar';
import Header from '../../components/Header';
import axios from 'axios';
const ProtectedPage: React.FC = () => {
  const openPage = url => {
    window.location.href = url;
  };

  const videoRef = useRef(null);

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 200, height: 200 },
      });
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const init = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/product/init'
      );
      alert(response.data);
      console.log('initialize data');
    } catch (error) {
      alert('DB was already initialized');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-lime-50">
      <Header title="Eco Scan" />
      <h2 className="mt-7 text-center">
        Align the barcode within the frame to scan
      </h2>
      <div className="flex justify-center">
        <div
          className="m-20 rounded-md relative "
          role="button"
          tabIndex={0}
          onClick={() => openPage('/productInfo')}
          onKeyDown={event => {
            console.log(event.key);
            console.log('clicked black rectangle');
          }}
        >
          <div className="absolute inset-8 border border-white rounded-md"></div>

          <div className="">
            <video ref={videoRef}>
              <track kind="captions" />
            </video>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="m-5 rounded-full bg-grey-green text-white p-3 center-button"
          onClick={init}
        >
          Initialize Data
        </button>
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
