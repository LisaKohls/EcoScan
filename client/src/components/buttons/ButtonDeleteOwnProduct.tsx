import { AiOutlineDelete } from 'react-icons/ai';
import { useCallback } from 'react';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const ButtonDeleteOwnProduct = ({ barcode }: { barcode: number }) => {
  const DELETE_PRODUCT_URL = `/api/products/personal/${barcode}`;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const deleteProduct = useCallback(async () => {
    try {
      const response = await axiosPrivate.delete(DELETE_PRODUCT_URL);

      if (response.status === 200) {
        console.log('Product deleted successfully');
        navigate(-1);
      } else {
        console.error('Product could not be deleted');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [barcode, navigate]);

  return (
    <button
      onClick={() => {
        deleteProduct();
      }}
      className="absolute right-0 lg:right-40 bottom-40 p-4"
    >
      <AiOutlineDelete className="w-7 h-7 mt-0" />
    </button>
  );
};

export default ButtonDeleteOwnProduct;
