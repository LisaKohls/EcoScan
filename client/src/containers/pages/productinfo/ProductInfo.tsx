import { ArcElement, Chart as ChartJs, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';

import HeartFavorites from '../../../components/buttons/ButtonHeart';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

ChartJs.register(ArcElement, Tooltip, Legend);

const ProductInfo: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { barcode } = useParams();

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
    <>
      {isLoading ? (
        <p>Loading product...</p>
      ) : (
        <div className="mx-auto md:px-20 lg:px-40">
          <>
            <div className="mx-auto md:px-20 lg:px-40">
              <div className="flex justify-start mt-4 ms-10 mr-10">
                <div>
                  <img
                    className="border border-gray-500 border-width-1 rounded w-fit h-fit "
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="flex flex-col ml-2">
                  <div className="flex">
                    <p className="text-xl mb-2 text-left">{product.name}</p>
                    <HeartFavorites
                      barcode={product.barcode}
                      isInitiallyFavorite={product.favorite}
                    />
                  </div>
                  <p className="text-xs sm:text-left lg:text-right">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="min-h bg-white border border-gray-500 border-width-1 rounded m-10 p-1 pb-9 ">
                <div className="flex justify-between mx-10 ">
                  <div className="flex flex-col items-center h-20 w-20 md:h-40 md:w-40">
                    <Pie data={dataSocialIndex} options={options} />
                    <p className="whitespace-nowrap">Social Index</p>
                  </div>
                  <div className="flex flex-col items-center h-20 w-20 md:h-40 md:w-40">
                    <Pie data={dataEcologicalIndex} options={options} />
                    <p className="whitespace-nowrap">Ecological Index</p>
                  </div>
                </div>
              </div>
              <div className="min-h bg-white border border-gray-500 border-width-1 rounded mt-8 m-10 p-1 ">
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
          </>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
