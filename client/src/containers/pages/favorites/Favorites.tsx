import React, { useCallback, useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from 'axios';
import { Product } from '../../../interfaces/IProduct';
import ProductContainer from '../../productcontainer/ProductContainer';

const FAVORITES_URL = '/api/favorites';

const Favorites: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const axiosPrivate = useAxiosPrivate();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosPrivate.get<Product[]>(FAVORITES_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      setProducts(response.data);
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate, searchQuery]);

  useEffect(() => {
    /**
     * TODO: Think about the search logic. What should be displayed with no searchQuery?
     * If displaying all favorites when searchQuery is empty, there is no need for fetching with the query as param.
     * instead it could be filtered local.
     * Problem: If there are too many favorites => very long fetching time.
     * Better: Just fetch like 10 favorites and then provide to load more. And when searching, send the searchQuery just like now to the server.
     * */

    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="pt-8 pb-28">
      {/*<SearchBar setSearchQuery={setSearchQuery} />*/}
      {products.length > 0 ? (
        <ProductContainer products={products} />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaRegHeart className="w-20 h-20 text-gray-300" />
          <h2 className="text-xl text-gray-600">No favorites yet!</h2>
          <p className="text-center text-gray-500 max-w-md mx-auto whitespace-normal">
            Looks like you haven&apos;t added any products to your favorites.
            Start exploring and add some!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
