import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { AxiosError, AxiosResponse } from 'axios';
import HeaderContext from '../../../contexts/HeaderProvider';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ProductNotFound from '../productnotfound/ProductNotFound';
import ProductDetails from './ProductDetails';
import PersonalProductDetails from './PersonalProductDetails';
import { ArcElement, Chart as ChartJs, Legend, Tooltip } from 'chart.js';
import LoadingAnimation from '../../../components/loadinganimation/LoadingAnimation';

ChartJs.register(ArcElement, Tooltip, Legend);

const ProductInfo: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productExists, setProductExists] = useState(true);
  const navigate = useNavigate();
  const { barcode } = useParams();
  const { setHeaderOptions } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderOptions({
      title: 'Product',
      backButton: true,
      rightIcon: (
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="cursor-pointer"
          onClick={() => navigate('/more-info')}
        />
      ),
    });
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get(`/api/products/${barcode}`);
      handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  const handleResponse = (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      setProduct(response.data);
      setIsLoading(false);
    } else {
      throw new Error('Invalid response status');
    }
  };

  const handleError = (error: any) => {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    } else {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleAxiosError = (error: AxiosError) => {
    if (error.response?.status === 403) {
      setProductExists(false);
    } else if (error.response?.status === 404) {
      navigate('/unauthorized');
    } else {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading && productExists) {
    return <LoadingAnimation />;
  }

  if (!productExists || !product) {
    return <ProductNotFound barcode={barcode ?? ''} />;
  }

  return product && product.isPersonalProduct ? (
    <PersonalProductDetails product={product} barcode={Number(barcode) ?? ''} />
  ) : (
    <ProductDetails product={product} />
  );
};

export default ProductInfo;
