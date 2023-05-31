import React, { useState } from 'react';
import { FaSearch } from 'react-icons/Fa';
import { Result } from '../../containers/protectedPage/InterfaceProps';

const SearchBar: React.FC<Result> = props => {
  const [barcodeNumber, setBarcodeNumber] = useState('');

  return (
    <div className="p-2">
      {props.results.map((result, id) => {
        return <div key={id}>{result.name}</div>;
      })}
    </div>
  );
};

export default SearchBar;
