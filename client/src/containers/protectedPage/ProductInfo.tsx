import React from 'react';
import { ProductInfoProps } from './ProductInfoProps';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Header from '../../components/Header';

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
        <Header title={props.name} />
        <button
          className="fixed top-0 left-0 ps-4 pt-8"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="inline-block text-white text-2xl" />
        </button>
      </div>
      <div>
        <div className="flex justify-between mx-10 mt-4 ">
          <div className="flex flex-col items-center ">
            <img
              src={props.img}
              alt={props.name}
              className=" w-400 h-400 border ms-4 me-4 border-gray-400 rounded"
            />
          </div>
          <div className="flex flex-col ms-10 items-left whitespace-nowrap">
            <p className="text-xl"> {props.name}</p>
            <p> {props.lifetimeIndex} Lifetime </p>
            <p> {props.waterIndex} Water </p>
          </div>
        </div>
        <div className="flex justify-between mx-10 mt-10 ">
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
    </div>
  );
};

export default ProductInfo;
