import { useCallback, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/search/SearchBar';
import SearchResultList from '../../../components/search/SearchResultList';
import { SearchResultsProps } from '../../../interfaces/SearchResultsProps';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from 'axios';

const SearchForProduct = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<SearchResultsProps>({
    searchResults: [],
  });
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const fetchProducts = useCallback(
    async (url: string) => {
      try {
        const response = await axiosPrivate.get(url, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        setProducts({ searchResults: [response.data] });
        console.log(`response: ${response.data}`);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Error occurred: ', err.response?.data);
        } else {
          console.error('An unknown error occurred: ', err);
        }
      }
    },
    [axiosPrivate, searchQuery]
  );

  useEffect(() => {
    fetchProducts(
      isNaN(Number(searchQuery))
        ? `http://localhost:3001/api/product/name?=${searchQuery}`
        : `http://localhost:3001/api/product/${searchQuery}`
    );
  }, [searchQuery, fetchProducts]);
  //console.log(`search for product product: ${products.searchResults}`)
  return (
    <>
      <div className="p-4">
        <SearchBar setSearchQuery={setSearchQuery} />
        <SearchResultList searchResults={products.searchResults} />
      </div>
    </>
  );
};

export default SearchForProduct;
