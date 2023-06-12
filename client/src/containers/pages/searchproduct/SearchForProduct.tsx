import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../../../components/search/SearchBar';
import SearchResultList from '../../../components/search/SearchResultList';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from 'axios';

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
    fetchProducts(searchQuery);
  }, [searchQuery, fetchProducts]);
  //console.log(`search for product product: ${products.searchResults}`)
  return (
    <>
      <div className="p-4">
        <SearchBar setSearchQuery={setSearchQuery} />
        <SearchResultList products={products} />
      </div>
    </>
  );
};

export default SearchForProduct;
