import React, { useState, useEffect, useCallback } from 'react';
import useZxing from '../../hooks/useZxing';
import PropTypes from 'prop-types';
import LoadingAnimation from '../loadinganimation/LoadingAnimation';

interface BarcodeScannerProps {
  onResult?: (result: any) => void;
  onError?: (error: Error) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onResult = () => {
    /* intentionally empty */
  },
  onError = () => {
    /* intentionally empty */
  },
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraDenied, setIsCameraDenied] = useState(false);
  const { ref } = useZxing({ onResult, onError });

  const handleCameraAccess = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraDenied(false);
      setIsLoading(false);
    } catch (err) {
      setIsCameraDenied(true);
    }
  }, []);

  useEffect(() => {
    handleCameraAccess();
  }, [handleCameraAccess]);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <p className="mt-4 text-center">
        Align the barcode within the scanner window
      </p>
      {isLoading && <LoadingAnimation />}
      {isCameraDenied && (
        <div>
          <p>Camera access is required.</p>
          <button onClick={handleCameraAccess}>Allow Access</button>
        </div>
      )}
      <div className="scanner-window-border mx-10 mt-2">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={ref} onCanPlay={() => setIsLoading(false)} />
      </div>
    </div>
  );
};

BarcodeScanner.propTypes = {
  onResult: PropTypes.func,
  onError: PropTypes.func,
};
