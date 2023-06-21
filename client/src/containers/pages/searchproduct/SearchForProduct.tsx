import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../../../components/search/SearchBar';
import SearchResultList from '../../../components/search/SearchResultList';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from 'axios';
import { Product } from '../../../interfaces/IProduct';
import { AiOutlineSearch } from 'react-icons/ai';

const PRODUCT_URL = '/api/product/';
const SearchForProduct = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);

  const axiosPrivate = useAxiosPrivate();

  const fetchProducts = useCallback(
    async (nameParam: string) => {
      try {
        const response = await axiosPrivate.get<Product[]>(PRODUCT_URL, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          params: {
            name: nameParam,
          },
        });

        setProducts(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Error occurred: ', err.response?.data);
        } else {
          console.error('An unknown error occurred: ', err);
        }
      }
    },
    [axiosPrivate]
  );

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchProducts(searchQuery);
    } else {
      setProducts([]);
    }
  }, [searchQuery, fetchProducts]);

  return (
    <>
      <div className="px-4 py-2">
        <SearchBar setSearchQuery={setSearchQuery} />
        {searchQuery.trim() === '' ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center">
            <AiOutlineSearch size={50} className="text-gray-400" />
            <p className="mt-4 text-gray-500 whitespace-normal">
              Start searching for products by entering a barcode or product name
            </p>
          </div>
        ) : (
          <SearchResultList products={products} searchQuery={searchQuery} />
        )}
      </div>
    </>
  );
};

export default SearchForProduct;
