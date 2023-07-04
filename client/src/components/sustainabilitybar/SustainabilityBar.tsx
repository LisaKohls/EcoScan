import React from 'react';

export interface SustainabilityBarProps {
  index: number;
  title: string;
}

const SustainabilityBar: React.FC<SustainabilityBarProps> = props => {
  const { index, title } = props;

  let color: string;

  if (index >= 70) {
    color = 'lime-600'; 
  } else if (index >= 40) {
    color = 'amber-300'; 
  } else {
    color = 'orange-400'; 
  }

  return (
    <div className="relative">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${color}`}>
            {title}
          </span>
        </div>
        <div className="text-right">
          <span className={`text-xs font-semibold inline-block text-${color}`}>{index}%</span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300 w-32">
        <div
          style={{ width: `${index}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-${color}`}
        ></div>
      </div>
    </div>
  );
};

export default SustainabilityBar;
