import React from 'react';
import { PopUpProps } from '../../containers/protectedPage/InterfaceProps';

const AddProductUI: React.FC<PopUpProps> = props => {
  const add = () => {
    //component is closing
    props.setTrigger(false);
  };
  console.log('pop up add new product opened');
  //das ganze input Zeug ist noch nicht sichtbar aber component wird schon geöffnet
  return (
    <div className="text-mainColor z-10 flex flex-col items-center p-4 overflow-auto">
      <div className="block mt-4 text-left">
        <h2 className="mt-5 text-center">Create new product</h2>
        <input
          className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
          type="text"
          placeholder="Enter barcode number"
        />
        <input
          className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
          type="text"
          placeholder="Enter name of product"
        />
        <input
          className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
          type="number"
          placeholder="Enter sustainability index"
        />
        <div className="flex justify-center">
          <button
            className="p-3 m-2 bg-grey-green text-white rounded-md"
            onClick={add}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductUI;
