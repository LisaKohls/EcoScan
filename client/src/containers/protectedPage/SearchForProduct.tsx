// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';

const SearchForProduct = () => {
  const [barcodeNumber, setBarcodeNumber] = useState('');
  return (
    <div>
      <p>Search For Product</p>

      <div className="p-4">
        <input
          className="w-full p-2 bg-white text-black border-2 border-green-400 rounded-md"
          type="text"
          placeholder="Enter barcode number"
          value={barcodeNumber}
          onChange={e => setBarcodeNumber(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchForProduct;
