import React from 'react';
import { PopUpProps } from '../../../interfaces/PopupProps';

const PopUp: React.FC<PopUpProps> = props => {
  const { children } = props;
  return props.trigger ? (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center overflow-hidden">
      <div className="items-center bg-primary-color  rounded-lg">
        {children}
      </div>
    </div>
  ) : null;
};
export default PopUp;
