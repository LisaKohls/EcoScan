import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { axiosPrivate } from '../../api/axiosAPI';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface HeartButton {
  productId: string;
}

//const HeartFavorites: React.FC<HeartButton> = props => {
const HeartFavorites: React.FC<HeartButton> = props => {
  const [favorite, setFavorite] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const getFavorites = useCallback(async () => {
    try {
      const response = await axiosPrivate.get('/api/favorites');
      const favoritProducts = response.data.filter(
        (e: HeartButton) => e.productId == props.productId
      );
      if (favoritProducts == '') {
        setFavorite(false);
        console.log(favoritProducts);
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
  }, [axiosPrivate, favorite]);

  //getFavorites();

  const addToFavorites = useCallback(async () => {
    try {
      const response = await axiosPrivate.post('/api/favorites/add', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        body: {
          productId: props.productId,
        },
      });
      console.log('set to favorites');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate, favorite]);

  const deleteFromFavorites = useCallback(async () => {
    try {
      const response = await axiosPrivate.post('/api/favorites/remove', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        body: {
          productId: props.productId,
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
  }, [axiosPrivate, favorite]);

  const checkFavorites = () => {
    if (favorite) {
      //deleteFromFavorites();
      setFavorite(false);
    } else {
      //addToFavorites();
      setFavorite(true);
      console.log('set to favorite');
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
