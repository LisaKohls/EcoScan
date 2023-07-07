import React, { useEffect, useState } from 'react';

export interface SustainabilityBarProps {
  index: number;
  title: string;
}

const SustainabilityBar: React.FC<SustainabilityBarProps> = props => {
  const { index, title } = props;
  const [progress, setProgress] = useState(0);

  const colorMap = {
    'lime-600': '#32CD32',
    'amber-300': '#FFBF00',
    'orange-400': '#FF7F00',
  };

  let color: string;

  if (index >= 70) {
    color = colorMap['lime-600'];
  } else if (index >= 40) {
    color = colorMap['amber-300'];
  } else {
    color = colorMap['orange-400'];
  }

  useEffect(() => {
    // slight delay for transition to occur on mount
    const timeout = setTimeout(() => {
      setProgress(index);
    }, 100);
    // cleanup function
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="relative">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span
            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
            style={{ color: color }}
          >
            {title}
          </span>
        </div>
        <div className="text-right">
          <span
            className="text-xs font-semibold inline-block"
            style={{ color: color }}
          >
            {index}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300 w-32">
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            transition: 'width 2s ease',
          }}
          className="shadow-none flex flex-col text-center whitespace-nowrap justify-center"
        ></div>
      </div>
    </div>
  );
};

export default SustainabilityBar;
