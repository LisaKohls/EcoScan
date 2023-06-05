import React from 'react';
import { Values } from '../containers/protectedPage/InterfaceProps';

const Bar: React.FC<Values> = props => {
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
    <div className="h-4 bg-gray-300 w-400 m-10 rounded">
      <div className="h-full rounded" style={barStyles}></div>

      <p className={textColorClass}>
        {label} {props.title}
      </p>
    </div>
  );
};

export default Bar;
