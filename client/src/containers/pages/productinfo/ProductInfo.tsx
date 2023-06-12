import { ArcElement, Chart as ChartJs, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';
import testImg from '../../../assets/bio_nut_butter_bar.png';

ChartJs.register(ArcElement, Tooltip, Legend);

const ProductInfo = () => {
  const exampleData = {
    img: testImg,
    name: 'Koro Riegel',
    socialIndex: 50,
    lifetimeIndex: 10,
    ecologicalIndex: 20,
    waterIndex: 50,
  };

  const dataSocialIndex = {
    datasets: [
      {
        backgroundColor: ['#636A5B', '#E0E0E0'],
        data: [exampleData.socialIndex, 100 - exampleData.socialIndex],
        labels: [
          `${exampleData.socialIndex}`,
          `${100 - exampleData.socialIndex}`,
        ],
      },
    ],
  };
  const dataEcologicalIndex = {
    datasets: [
      {
        backgroundColor: ['#636A5B', '#E0E0E0'],
        data: [exampleData.ecologicalIndex, 100 - exampleData.ecologicalIndex],
        labels: [
          `${exampleData.ecologicalIndex}`,
          `${100 - exampleData.ecologicalIndex}`,
        ],
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 1, // Adjust the border size as needed
        borderColor: 'gray', // Set the border color to grey
      },
    },
  };

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 md:px-20 lg:px-40">
        <div className="flex justify-center lg:justify-start">
          <img
            className="w-40 h-600 m-auto ms-10 mt-5 border border-gray-500 border-width-1 rounded"
            src={exampleData.img}
            alt={exampleData.name}
          />
          <p className="text-xl mt-4 mr-11 lg:text-right">{exampleData.name}</p>
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
          <SustainabilityBar
            index={exampleData.lifetimeIndex}
            title="Lifetime"
          />
          <SustainabilityBar
            index={exampleData.waterIndex}
            title="Water usage"
          />
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
