import { useCallback, useContext, useEffect, useState } from 'react';
import SearchBar from '../../../components/search/SearchBar';
import SearchResultList from '../../../components/search/SearchResultList';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from 'axios';
import { Product } from '../../../interfaces/IProduct';
import { AiOutlineSearch } from 'react-icons/ai';
import HeaderContext from '../../../contexts/HeaderProvider';

const PRODUCT_URL = '/api/product/';
const SearchForProduct = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { setHeaderOptions } = useContext(HeaderContext);

  useEffect(() => {
    const title =
      products.length == 0
        ? 'Search Product'
        : `Results for "${searchQuery}" (${products.length})`;
    setHeaderOptions({
      title: title,
      backButton: false,
      rightIcon: null,
    });
  }, [setHeaderOptions, products.length, searchQuery]);

  const fetchProducts = useCallback(
    async (nameParam: string) => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get<Product[]>(PRODUCT_URL, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          params: {
            name: nameParam,
          },
        });

        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
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
  console.log(`loading: ${isLoading}`);
  return (
    <>
      <div className="px-4 pb-28">
        <SearchBar setSearchQuery={setSearchQuery} />
        {searchQuery.trim() === '' ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center">
            <AiOutlineSearch size={50} className="text-gray-400" />
            <p className="mt-4 text-gray-500 whitespace-normal">
              Start searching for products by entering a barcode or product name
            </p>
          </div>
        ) : (
          <SearchResultList
            products={products}
            searchQuery={searchQuery}
            loading={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default SearchForProduct;
