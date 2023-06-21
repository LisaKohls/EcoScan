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
  const product = location.state as Product | undefined;

  if (!product) {
    console.log('product empty');
    return null;
  } else {
    if (!product.name) {
      console.log('no entries');
      return null;
    } else {
      console.log(`product response: ${product.name}`);
    }
  }

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

  console.log('infoPage');
  console.log(image);
  const options = {
    elements: {
      arc: {
        borderWidth: 1, // Adjust the border size as needed
        borderColor: 'gray', // Set the border color to grey
      },
    },
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

  console.log(`water: ${sustainabilityEcoWater}`);
  console.log(`lifetime: ${sustainabilityEcoLifetime}`);
  console.log(`dataecoIndex: ${dataEcologicalIndex}`);

  return (
    <>
      <div className="mx-auto md:px-20 lg:px-40">
        <div className="flex justify-start mt-4 ms-10 mr-10">
          <div>
            <img
              className="border border-gray-500 border-width-1 rounded w-fit h-fit "
              src={image}
              alt={name}
            />
          </div>
          <div className="flex flex-col ml-2">
            <div className="flex">
              <p className="text-xl mb-2 text-left">{name}</p>
              <HeartFavorites
                productIdFavorites={productId}
                className="text-right"
              />
            </div>
            <p className="text-xs sm:text-left lg:text-right">{description}</p>
          </div>
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
