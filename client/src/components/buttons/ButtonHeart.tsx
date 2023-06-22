import { useCallback, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface HeartButtonProps {
  barcode: number;
  isInitiallyFavorite: boolean;
}

const HeartFavorites = ({ barcode, isInitiallyFavorite }: HeartButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);
  const axiosPrivate = useAxiosPrivate();
  const [animationClass, setAnimationClass] = useState('');

  const handleIsFavorite = useCallback(async () => {
    if (!isFavorite) {
      setAnimationClass('scale-125');

      setTimeout(() => {
        setAnimationClass('scale-100');
      }, 300); // Reset scale after 300ms
    }

    const url = isFavorite ? '/api/favorites/remove' : '/api/favorites/add';

    try {
      const response = await axiosPrivate.post(
        url,
        { barcode: barcode },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        setIsFavorite(prevState => !prevState);
      } else {
        console.error('Favorite could not be added or removed');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [axiosPrivate, barcode, isFavorite]);

  return (
    <div>
      <button
        className={`text-4xl pl-2 transition-all duration-300 transform ${animationClass}`}
        onClick={handleIsFavorite}
      >
        {isFavorite ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart />
        )}
      </button>
    </div>
  );
};

export default HeartFavorites;
