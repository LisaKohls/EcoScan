import React, { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../../components/productcard/ProductCard';
import SearchBar from '../../../components/search/SearchBar';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from 'axios';
import { Product } from '../../../interfaces/IProduct';

const PRODUCT_URL = '/api/product';
const Favorites: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const axiosPrivate = useAxiosPrivate();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosPrivate.get<Product[]>(PRODUCT_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        params: {
          name: searchQuery,
        },
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
    if (searchQuery !== '') {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [searchQuery, fetchProducts]);

  const renderProducts = products.map((product, index) => (
    <ProductCard
      key={index}
      barcode={product.barcode}
      categories={product.categories}
      name={product.name}
      description={product.description}
      image={product.image}
      sustainabilityName={product.sustainabilityName}
      sustainabilityEcoWater={product.sustainabilityEcoWater}
      sustainabilityEcoLifetime={product.sustainabilityEcoLifetime}
      sustainabilityEco={product.sustainabilityEco}
      sustainabilitySocial={product.sustainabilitySocial}
      productId={product.productId}
    />
  ));

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
        {renderProducts}
      </div>
    </>
  );
};

export default Favorites;
