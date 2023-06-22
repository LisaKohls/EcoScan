import React from 'react';

export interface SustainabilityBarProps {
  index: number;
  title: string;
}

const SustainabilityBar: React.FC<SustainabilityBarProps> = props => {
  let label: string;
  let textColorClass: string;

  const barStyles = {
    width: `${props.index}%`,
    backgroundColor:
      props.index >= 70
        ? 'rgb(101 163 13)'
        : props.index >= 40
        ? 'rgb(252 211 77)'
        : 'rgb(251 146 60)',
  };

  if (props.index >= 70) {
    label = 'Good';
    textColorClass = 'text-lime-600';
  } else if (props.index >= 40) {
    textColorClass = 'text-amber-300';
    label = 'Medium';
  } else {
    textColorClass = 'text-orange-400';
    label = 'Bad';
  }

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${textColorClass}`}
          >
            {props.title}
          </span>
        </div>
        <div className="text-right">
          <span
            className={`text-xs font-semibold inline-block ${textColorClass}`}
          >
            {props.index}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${props.index}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${barStyles.backgroundColor}`}
        ></div>
      </div>
    </div>
  );
};

export default SustainabilityBar;
