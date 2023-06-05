import React from 'react';
import { ProductInfoProps } from './cardProductViewProps';
import { useNavigate } from 'react-router-dom';

const CardProductView: React.FC<ProductInfoProps> = props => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 hover:scale-125">
      <button onClick={() => navigate(-1)}>
        <img src={props.img} alt={props.name} />
        <div>
          <div className="text-xl font-medium text-black">{props.name}</div>
          <p className="text-slate-500">{props.index}</p>
        </div>
      </button>
    </div>
  );
};

export default CardProductView;
