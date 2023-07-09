import React from 'react';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';
import HeartFavorites from '../../../components/buttons/ButtonHeart';
import product_placeholder from '../../../assets/noimage_placeholder.png';
import ButtonDeleteOwnProduct from '../../../components/buttons/ButtonDeleteOwnProduct';

const PersonalProductDetails = ({
  product,
  barcode,
}: {
  product: any;
  barcode: number;
}) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 whitespace-normal pb-28 mt-[-5rem]">
    <div className="relative flex flex-col items-center w-full md:w-1/2">
      <img
        className="w-full lg:w-fit h-64 object-cover rounded-lg mb-4"
        src={product.image ?? product_placeholder}
        alt={product.name}
      />

      <h2 className="text-center text-3xl font-extrabold text-gray-900 whitespace-normal">
        {product.name}
      </h2>
      <ButtonDeleteOwnProduct barcode={barcode} />
      <p className="mt-2 text-center text-sm text-gray-600 whitespace-normal">
        {product.description}
      </p>
      <div className="absolute top-0 right-0 mt-2 mr-2 md:mt-2 md:mr-6 lg:right-40">
        <HeartFavorites
          barcode={product.barcode}
          isInitiallyFavorite={product.favorite}
        />
      </div>
      <div className="w-full md:w-1/2">
        <div className="mt-10">
          <h3 className="text-center text-lg font-bold text-gray-900">
            Personal Sustainability Metric
          </h3>
          <div className="mt-4 flex flex-col items-center space-y-6">
            <SustainabilityBar
              index={product.sustainabilityEco}
              title="Lifetime"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersonalProductDetails;
