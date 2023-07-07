import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import ButtonAddNewProduct from '../../../components/buttons/ButtonAddNewProduct';
import InputField from '../../../components/addProduct/InputField';
import { axiosPrivate } from '../../../api/axiosAPI';
import axios from 'axios';

interface AddProductProps {
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

const ADD_PRODUCT_URL = '/api/product/add';
const AddProduct: React.FC<AddProductProps> = props => {
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [sustainabilityIndex, setsustaibabilityIndex] = useState('');

  const addProduct = useCallback(async () => {
    try {
      const response = await axiosPrivate.post(ADD_PRODUCT_URL, AddProduct, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log('Product added successfully');
        props.setTrigger(false); // Close the window
      } else {
        console.error('Favorite could not be added or removed');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [props]);

  const handleClose = () => {
    props.setTrigger(false); // Close the window
  };

  console.log('pop up add new product opened');
  // das ganze input Zeug ist noch nicht sichtbar, aber die Komponente wird schon geöffnet
  return (
    <div className="text-black z-10 flex flex-col p-4 overflow-auto">
      <div className="flex justify-end">
        <button className="text-white focus:outline-none" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <h2 className="mt-5 text-center text-white text-xl">
        Create New Product
      </h2>
      {/* Barcode field */}
      <InputField
        label="Barcode Number"
        value={barcode}
        onChange={setBarcode}
        placeholder="Enter barcode number"
      />
      {/* Barcode field */}
      <InputField
        label="Name of Product"
        value={name}
        onChange={setName}
        placeholder="Enter name of product"
      />
      <InputField
        label="Sustainability Index"
        value={sustainabilityIndex}
        onChange={setsustaibabilityIndex}
        placeholder="Enter sustainability index"
      />
      <div>
        <ButtonAddNewProduct onClick={addProduct}>Add</ButtonAddNewProduct>
      </div>
    </div>
  );
};

export default AddProduct;
