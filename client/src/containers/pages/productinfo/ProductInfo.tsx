import { ArcElement, Chart as ChartJs, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';

import HeartFavorites from '../../../components/buttons/ButtonHeart';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderContext from '../../../contexts/HeaderProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

ChartJs.register(ArcElement, Tooltip, Legend);

const ProductInfo: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    async function fetchData() {
      try {
        //const barcode = 10390429; // Replace with your barcode
        const response = await axiosPrivate.get(`/api/product/${barcode}`);

        if (response.status !== 200) {
          throw new Error(`Error: received ${response.status} response`);
        }

        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const options = {
    elements: {
      arc: {
        borderWidth: 1, // Adjust the border size as needed
        borderColor: 'gray', // Set the border color to grey
      },
    },
  };

  const dataSocialIndex = {
    datasets: [
      {
        backgroundColor: ['#636A5B', '#E0E0E0'],
        data: [
          product?.sustainabilitySocial || 0,
          100 - (product?.sustainabilitySocial || 0),
        ],
        labels: [
          `${product?.sustainabilitySocial || 0}`,
          `${100 - (product?.sustainabilitySocial || 0)}`,
        ],
      },
    ],
  };
  const dataEcologicalIndex = {
    datasets: [
      {
        backgroundColor: ['#636A5B', '#E0E0E0'],
        data: [
          product?.sustainabilityEco || 0,
          100 - (product?.sustainabilityEco || 0),
        ],
        labels: [
          `${product?.sustainabilityEco || 0}`,
          `${100 - (product?.sustainabilityEco || 0)}`,
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 whitespace-normal pb-28 mt-[-2rem]">
      {isLoading ? (
        <p>Loading product...</p>
      ) : (
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <img
              className="mx-auto h-32 w-32 object-cover"
              src={product.image}
              alt={product.name}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 whitespace-normal">
              {product.name}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 whitespace-normal">
              {product.description}
            </p>
            <HeartFavorites
              barcode={product.barcode}
              isInitiallyFavorite={product.favorite}
            />
          </div>
          <div className="mt-10">
            <h3 className="text-center text-lg font-bold text-gray-900">
              Sustainability Metrics
            </h3>
            <div className="mt-4 flex flex-col items-center space-y-6">
              <SustainabilityBar
                index={product.sustainabilityEcoLifetime}
                title="Lifetime"
              />
              <SustainabilityBar
                index={product.sustainabilityEcoWater}
                title="Water usage"
              />
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-center text-lg font-bold text-gray-900">
              Sustainability Indices
            </h3>
            <div className="mt-4 flex flex-row items-center justify-center space-x-6">
              <div className="flex flex-col items-center w-1/3">
                <Pie data={dataSocialIndex} options={options} />
                <p className="text-center text-sm text-gray-600">
                  Social Index
                </p>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <Pie data={dataEcologicalIndex} options={options} />
                <p className="text-center text-sm text-gray-600">
                  Ecological Index
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
