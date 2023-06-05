import React from 'react';
import { PopUpProps } from '../../containers/protectedPage/InterfaceProps';

const PopUp: React.FC<PopUpProps> = props => {
  const { children } = props;
  return props.trigger ? (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center overflow-hidden">
      <div className="absolute top-20 bottom-0 right-1/2 left-1/2 transform -translate-x-1/2 p-0 w-auto h-auto bg-textColor overflow-y-hidden">
        <button
          className="absolute top-0 right-0 p-1/2 cursor-pointer bg-transparent border-none outline-none text-mainColor text-1.8xl"
          onClick={() => {
            props.setTrigger(false);
            document.body.style.overflow = 'auto';
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  ) : null;
};
export default PopUp;
