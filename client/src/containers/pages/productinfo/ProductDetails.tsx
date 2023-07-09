import React from 'react';
import { Pie } from 'react-chartjs-2';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';
import HeartFavorites from '../../../components/buttons/ButtonHeart';
import product_placeholder from '../../../assets/noimage_placeholder.png';

const options = {
  elements: {
    arc: {
      borderWidth: 1,
      borderColor: 'gray',
    },
  },
};

const ProductDetails = ({ product }: { product: any }) => {
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
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <img
            className="mx-auto h-32 w-32 object-cover"
            src={product.image ?? product_placeholder}
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
              <p className="text-center text-sm text-gray-600">Social Index</p>
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
    </div>
  );
};

export default ProductDetails;
