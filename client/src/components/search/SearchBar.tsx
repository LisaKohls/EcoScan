// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/Fa';
import axios from 'axios';
import PropTypes from 'prop-types';

//funktion set result um neues ergebnis state zu setzen mit der ergebnis Liste
const SearchBar = ({ setResults }) => {
  const [barcodeNumber, setBarcodeNumber] = useState('');

  const getData = async value => {
    try {
      const response = await axios.get(`http://localhost:3001/api/product`, {
        headers: {},
        method: 'GET',
        body: {},
      });
      const jsonData = response.data;
      const results = jsonData.filter(item => item.barcode === value);
      console.log(results.name);
      setResults(results);
      console.log('initialize data');
    } catch (error) {
      alert('Error getting data of barcode.');
      console.error(error);
    }
  };

  SearchBar.propTypes = {
    setResults: PropTypes.func.isRequired,
  };

  const handleChange = value => {
    setBarcodeNumber(value);
    getData(value);
    console.log(`http://localhost:3001/api/product/:${barcodeNumber}`);
    console.log(`Your barcode input ${barcodeNumber}`);
    console.log(`input value: ${value}`);
  };
  return (
    <div>
      <FaSearch id="search-icon" className="absolute right-10 mt-3 w-5 h-5 " />
      <input
        className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
        type="text"
        placeholder="Enter barcode number"
        value={barcodeNumber}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
