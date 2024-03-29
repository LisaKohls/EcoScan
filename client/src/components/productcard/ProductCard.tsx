import React from 'react';
import HeartFavorites from '../buttons/ButtonHeart';
import { Link } from 'react-router-dom';
import noimage from '../../assets/noimage_placeholder.png';

interface ProductCardProps {
  name: string;
  description: string;
  barcode: number;
  image: string;
  favorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  barcode,
  image,
  favorite,
}) => {
  return (
    <div className="cursor-pointer bg-gray-50 border border-gray-300 rounded-md overflow-hidden max-w-xs mx-auto">
      <Link to={`/products/${barcode}`} className="cursor-pointer">
        <img
          className="w-full h-64 object-cover"
          src={image ?? noimage}
          alt={name}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 whitespace-normal">
            {name}
          </h2>
          <p className="text-gray-600 text-sm whitespace-normal">
            {description}
          </p>
        </div>
      </Link>
      <div className="flex justify-between items-center p-4 border-t">
        <div className="text-sm">
          <span className="font-semibold">Barcode:</span> {barcode}
        </div>
        <HeartFavorites barcode={barcode} isInitiallyFavorite={favorite} />
      </div>
    </div>
  );
};

export default ProductCard;
