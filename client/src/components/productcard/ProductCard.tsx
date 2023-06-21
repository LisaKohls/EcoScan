import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCardProps } from '../../interfaces/ProductCardProps';

const ProductCard: React.FC<ProductCardProps> = props => {
  const navigate = useNavigate();

  return (
    <div className="p-text-between max-w-sm min-w-full min-h-full mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 flex-1">
      <button onClick={() => navigate('/productInfo')}>
        <img src={props.img} alt={props.name} />
        <div>
          <div className="text-xl font-medium text-black">{props.name}</div>
          <p className="text-slate-500">{props.index}</p>
        </div>
      </button>
    </div>
  );
};

export default ProductCard;
