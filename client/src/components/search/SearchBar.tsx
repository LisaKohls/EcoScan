// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/Fa';
import axios from 'axios';
import PropTypes from 'prop-types';

//funktion set result um neues ergebnis state zu setzen mit der ergebnis Liste
const SearchBar = ({ setResults }) => {
  const [barcodeNumber, setBarcodeNumber] = useState('');

  const getDataBarcode = async value => {
    try {
      const response = await axios.get(`http://localhost:3001/api/product`, {
        headers: {},
        method: 'GET',
        body: {},
      });
      const data = response.data;

      const results = data.filter(item => item.barcode.includes(value));
      console.log(results.name);
      setResults(results);
      console.log('initialize data');
    } catch (error) {
      alert('Error getting data of barcode.');
      console.error(error);
    }
  };

  const getDataName = async value => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/product?name=${value}`,
        {
          headers: {},
          method: 'GET',
          body: {},
        }
      );
      const data = response.data;
      setResults(data);
      console.log('initialize data by name');
    } catch (error) {
      alert('Error getting data of barcode.');
      console.error(error);
    }
  };

  SearchBar.propTypes = {
    setResults: PropTypes.func.isRequired,
  };

  const handleChange = value => {
    if (value == '') {
      setBarcodeNumber('');
      setResults('');
      //isNaN gibt bei einem String true zurück
    } else if (isNaN(Number(value))) {
      setBarcodeNumber(value);
      getDataName(value);
      console.log(`localhost:3001/api/product?name=${value}`);
    } else {
      setBarcodeNumber(value);
      getDataBarcode(value);
    }
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
