import React from 'react';
import { ProductInfoProps } from './ProductInfoProps';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Header from '../../components/Header';
import Bar from '../../components/Bar';

ChartJs.register(ArcElement, Tooltip, Legend);

const ProductInfo: React.FC<ProductInfoProps> = props => {
  const navigate = useNavigate();
  const dataSocialIndex = {
    datasets: [
      {
        backgroundColor: ['#636A5B', '#E0E0E0'],
        data: [props.socialIndex, 100 - props.socialIndex],
        labels: [`${props.socialIndex}`, `${100 - props.socialIndex}`],
      },
    ],
  };
  const dataEcologicalIndex = {
    datasets: [
      {
        backgroundColor: ['#636A5B', '#E0E0E0'],
        data: [props.ecologicalIndex, 100 - props.ecologicalIndex],
        labels: [`${props.ecologicalIndex}`, `${100 - props.ecologicalIndex}`],
      },
    ],
  };
  /* für slide in animation
  useEffect(() => {
    document.body.classList.add('slide-in-page');

    return () => {
      document.body.classList.remove('slide-in-page');
    };
  }, []);*/

  const options = {
    elements: {
      arc: {
        borderWidth: 1, // Adjust the border size as needed
        borderColor: 'gray', // Set the border color to grey
      },
    },
  };

  return (
    <div className="min-h-screen bg-lime-50">
      <div>
        <Header title="Information" />
        <button
          className="fixed top-0 left-0 ps-4 pt-8"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="inline-block text-white text-2xl" />
        </button>
      </div>
      <div>
        <div className="text-center"></div>
        <div className="flex justify-center">
          <img
            className="w-40 h-600 m-auto ms-10 mt-5 border border-gray-500 border-width-1 rounded"
            src={props.img}
            alt={props.name}
          />
          <p className="text-xl mt-4 mr-11">{props.name}</p>
        </div>
        <div className="min-h bg-white border border-gray-500 border-width-1 rounded m-10 p-1 pb-9 ">
          <div className="flex justify-between mx-10 ">
            <div className="flex flex-col items-center h-20 w-20">
              <Pie data={dataSocialIndex} options={options} />
              <p className="whitespace-nowrap">Social Index</p>
            </div>
            <div className="flex flex-col items-center h-20 w-20">
              <Pie data={dataEcologicalIndex} options={options} />
              <p className="whitespace-nowrap">Ecological Index</p>
            </div>
          </div>
        </div>
        <div className="min-h bg-white border border-gray-500 border-width-1 rounded mt-8 m-10 p-1 ">
          <Bar index={props.lifetimeIndex} title="Lifetime" />
          <Bar index={props.waterIndex} title="Water usage" />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
