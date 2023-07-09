import React from 'react';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';
import HeartFavorites from '../../../components/buttons/ButtonHeart';
import product_placeholder from '../../../assets/noimage_placeholder.png';

const PersonalProductDetails = ({ product }: { product: any }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 whitespace-normal pb-28 mt-[-2rem]">
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
      <div className="mt-8 items-center">
        <HeartFavorites
          barcode={product.barcode}
          isInitiallyFavorite={product.favorite}
        />
      </div>
      <div className="flex mt-8 justify-center items-center">
        <SustainabilityBar
          index={product.sustainabilityEco}
          title="Sustainability Index"
        />
      </div>
    </div>
  </div>
);

export default PersonalProductDetails;
