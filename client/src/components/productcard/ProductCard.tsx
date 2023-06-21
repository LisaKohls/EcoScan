import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/IProduct';

const ProductCard: React.FC<Product> = props => {
  const navigate = useNavigate();

  const gotoDetailedView = () => {
    navigate(`/product/${props.barcode}`);
  };
  console.log(props);

  return (
    <div className="p-text-between max-w-sm min-w-full min-h-full mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 flex-1">
      <button onClick={gotoDetailedView}>
        <img src={props.image} alt={props.name} />
        <div>
          <div className="text-xl font-medium text-black">{props.name}</div>
          <p className="text-slate-500">{props.sustainabilityEco}</p>
        </div>
      </button>
    </div>
  );
};

export default ProductCard;
