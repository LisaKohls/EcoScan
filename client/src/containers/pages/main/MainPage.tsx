// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef } from 'react';
import ButtonPrimary from '../../../components/buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 200, height: 200 },
      });
      const video = videoRef.current as HTMLVideoElement;
      if (video !== null) {
        video.srcObject = stream;
        await video.play();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const navigateToPage = (page: string) => {
    navigate('/' + page);
  };

  return (
    <>
      <h2 className="mt-7 text-center">
        Align the barcode within the frame to scan
      </h2>
      <div className="flex justify-center">
        <button
          className="m-10 rounded-md relative "
          onClick={() => navigate('/productInfo')}
        >
          <div className="absolute inset-8 border border-white rounded-md"></div>

          <div className="">
            <video ref={videoRef}>
              <track kind="captions" />
            </video>
          </div>
        </button>
      </div>
      <ButtonPrimary onClick={() => navigateToPage('searchForProduct')}>
        Type in manually
      </ButtonPrimary>
    </>
  );
};

export default MainPage;
