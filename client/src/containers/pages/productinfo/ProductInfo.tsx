import { ArcElement, Chart as ChartJs, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';

import HeartFavorites from '../../../components/buttons/ButtonHeart';
import { Product } from '../../../interfaces/IProduct';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

ChartJs.register(ArcElement, Tooltip, Legend);

const ProductInfo: React.FC = () => {
  const location = useLocation();
  let product = location.state as Product | undefined;

  if (!product) {
    console.log("product empty")
    return null;
  }else{
    product = (location.state as { product: Product }).product;
    console.log(product);
  };

  const {
    image,
    name,
    description,
    sustainabilityEcoWater,
    sustainabilityEcoLifetime,
    sustainabilityEco,
    sustainabilitySocial,
    productId,
  } = product;

  console.log("infoPage");
  console.log(image);
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
        data: [sustainabilitySocial, 100 - sustainabilitySocial],
        labels: [`${sustainabilitySocial}`, `${100 - sustainabilitySocial}`],
      },
    ],
  };
  const dataEcologicalIndex = {
    datasets: [
      {
        backgroundColor: ['#636A5B', '#E0E0E0'],
        data: [sustainabilityEco, 100 - sustainabilityEco],
        labels: [`${sustainabilityEco}`, `${100 - sustainabilityEco}`],
      },
    ],
  };

  ProductInfo.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sustainabilityEcoWater: PropTypes.number.isRequired,
    sustainabilityEcoLifetime: PropTypes.number.isRequired,
    sustainabilityEco: PropTypes.number.isRequired,
    sustainabilitySocial: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
  };

  return (
    <>
      <div className="mx-auto md:px-20 lg:px-40">
        <div className="flex justify-start mt-4 ms-10 mr-10">
          <div className="flex flex-1 items-start justify-start">
            <img
              className="w-40 h-600 border border-gray-500 border-width-1 rounded "
              src={image}
              alt={name}
            />
            <HeartFavorites productIdFavorites={productId} />
          </div>
          <p className="text-xl sm:text-left lg:text-right">{name}</p>
          <p className="text-xl sm:text-left lg:text-right">{description}</p>
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
            index={sustainabilityEcoLifetime}
            title="Lifetime"
          />
          <SustainabilityBar
            index={sustainabilityEcoWater}
            title="Water usage"
          />
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
