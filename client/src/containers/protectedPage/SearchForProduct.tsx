// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import Header from '../../components/Header';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/search/SearchBar';
import SearchResultList from '../../components/search/SearchResultList';

const SearchForProduct = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  return (
    <div>
      <Header title="Search For Product" />
      <button
        className="fixed top-0 left-0 ps-4 pt-8"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft className="inline-block text-white text-2xl" />
      </button>
      <div className="p-4">
        <SearchBar setResults={setResults} />
        <SearchResultList results={results} />
      </div>
    </div>
  );
};

export default SearchForProduct;
