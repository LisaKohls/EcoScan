import React from 'react';
import { ProductInfoProps } from './cardProductViewProps';
import { useNavigate } from 'react-router-dom';

const CardProductView: React.FC<ProductInfoProps> = props => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mx-10 mt-10">
      <button onClick={() => navigate(-1)}>
        <img src={props.img} alt={props.name} />
        <div className="">
          <h5 className="">{props.name}</h5>
          <p className="">{props.index}</p>
        </div>
      </button>
    </div>
  );
};

export default CardProductView;
