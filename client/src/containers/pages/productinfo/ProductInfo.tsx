import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ArcElement, Chart as ChartJs, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import SustainabilityBar from '../../../components/sustainabilitybar/SustainabilityBar';
import testImg from '../../../assets/bio_nut_butter_bar.png';

ChartJs.register(ArcElement, Tooltip, Legend);

const ProductInfo = () => {
  const navigate = useNavigate();

  const exampleData = {
    img: testImg,
    name: 'Koro Riegel',
    socialIndex: 50,
    lifetimeIndex: 50,
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
    <>
      <div>
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
            src={exampleData.img}
            alt={exampleData.name}
          />
          <p className="text-xl mt-4 mr-11">{exampleData.name}</p>
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
