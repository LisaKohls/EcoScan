import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/IProduct';

const ProductCard: React.FC<Product> = props => {
  const navigate = useNavigate();
  const productInfo = () => {
    console.log(props.name)
    console.log('Clicked on product, navigate to infopage')
    navigate('/productInfo', {
      state: {
        barcode: props.barcode,
        categories: props.categories,
        name: props.name,
        description: props.description,
        image: props.image,
        sustainabilityName: props.sustainabilityName,
        sustainabilityEcoWater: props.sustainabilityEcoWater,
        sustainabilityEcoLifetime: props.sustainabilityEcoLifetime,
        sustainabilityEco: props.sustainabilityEco,
        sustainabilitySocial: props.sustainabilitySocial,
        productId: props.productId,
      },
    });
  };



  return (
    <div className="p-text-between max-w-sm min-w-full min-h-full mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 flex-1">
      <button onClick={productInfo}>
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
