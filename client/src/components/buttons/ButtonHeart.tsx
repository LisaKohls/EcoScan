import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Product } from '../../interfaces/IProduct';

interface HeartButton {
  productIdFavorites: string;
}

const FAVORITES_URL = '/api/favorites';
const HeartFavorites: React.FC<HeartButton> = props => {
  const [favorite, setFavorite] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const getFavorites = useCallback(async () => {
    try {
      const response = await axiosPrivate.get<Product[]>(FAVORITES_URL);
      const favoriteProducts = response.data.filter(
        (product: Product) => product.productId === props.productIdFavorites
      );
      console.log(response.data);
      console.log(favoriteProducts);
      if (favoriteProducts.length === 0) {
        setFavorite(false);
        console.log('Not a favorite');
      } else {
        setFavorite(true);
        console.log('Is a favorit');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate, props.productIdFavorites]);

  const addToFavorites = useCallback(async () => {
    try {
      const response = await axiosPrivate.post('/api/favorites/add', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        body: {
          productId: props.productIdFavorites,
        },
      });
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate, props.productIdFavorites]);

  const removeFromFavorites = useCallback(async () => {
    try {
      await axiosPrivate.post('/api/favorites/remove', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        body: {
          productId: props.productIdFavorites,
        },
      });
      console.log('removed from favorites');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate, props.productIdFavorites]);

  useEffect(() => {
    getFavorites();
  }, [addToFavorites, removeFromFavorites, getFavorites]);

  const checkFavorites = () => {
    if (favorite) {
      setFavorite(false);
      removeFromFavorites();
    } else {
      setFavorite(true);
      addToFavorites();
      console.log('call add to favorites in checkFavorites');
    }
  };

  const renderIsFavorit = <AiFillHeart />;

  const renderNoFavorit = <AiOutlineHeart />;

  return (
    <div>
      <button className="text-4xl pl-2" onClick={checkFavorites}>
        {favorite ? renderIsFavorit : renderNoFavorit}
      </button>
    </div>
  );
};

export default HeartFavorites;
