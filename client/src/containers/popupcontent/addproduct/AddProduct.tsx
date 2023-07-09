import React, { useState, useCallback } from 'react';
import ButtonAddNewProduct from '../../../components/buttons/ButtonAddNewProduct';
import InputField from '../../../components/addProduct/InputField';
import { axiosPrivate } from '../../../api/axiosAPI';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ADD_PRODUCT_URL = '/api/products/add';

interface AddProductProps {
  onClose: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [sustainabilityIndex, setSustainabilityIndex] = useState('');
  const [barcodeError, setBarcodeError] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [sustainabilityIndexError, setSustainabilityIndexError] = useState('');

  const validateInputs = () => {
    let isValid = true;

    if (!barcode || isNaN(Number(barcode))) {
      setBarcodeError('Please enter a valid barcode.');
      isValid = false;
    }

    if (!productName) {
      setProductNameError('Please enter a product name.');
      isValid = false;
    }

    if (!description) {
      setDescriptionError('Please enter a product description.');
      isValid = false;
    }

    if (!sustainabilityIndex || isNaN(Number(sustainabilityIndex))) {
      setSustainabilityIndexError('Please enter a valid sustainability index.');
      isValid = false;
    }

    return isValid;
  };

  const addProduct = useCallback(async () => {
    if (!validateInputs()) return;

    const addProductRequest = {
      barcode: Number(barcode),
      name: productName,
      description: description,
      sustainabilityEco: Number(sustainabilityIndex),
      sustainabilitySocial: 0,
    };

    try {
      const response = await axiosPrivate.post(
        ADD_PRODUCT_URL,
        addProductRequest
      );

      if (response.status === 200) {
        console.log('Product added successfully');
        onClose(); // Close the window
        navigate(`/products/${barcode}`);
      } else {
        console.error('Product could not be added');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error occurred: ', err.response?.data);
      } else {
        console.error('An unknown error occurred: ', err);
      }
    }
  }, [barcode, productName, sustainabilityIndex, onClose]);

  return (
    <div className="text-black z-10 flex flex-col p-4 overflow-auto lg:px-10 mx-margin-elements lg:mx-4">
      <div className="flex justify-end ">
        <button className="text-white focus:outline-none" onClick={onClose}>
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
      <h2 className=" mt-5 text-center text-white text-xl">
        Create New Product
      </h2>
      <InputField
        label="Barcode Number"
        value={barcode}
        onChange={value => {
          setBarcode(value);
          setBarcodeError('');
        }}
        onBlur={validateInputs}
        error={barcodeError}
        placeholder="Enter barcode number"
      />
      <InputField
        label="Name of Product"
        value={productName}
        onChange={value => {
          setProductName(value);
          setProductNameError('');
        }}
        onBlur={validateInputs}
        error={productNameError}
        placeholder="Enter name of product"
      />
      <InputField
        label="Product Description"
        value={description}
        onChange={value => {
          setDescription(value);
          setDescriptionError('');
        }}
        onBlur={validateInputs}
        error={descriptionError}
        placeholder="Enter product description"
      />
      <InputField
        label="Sustainability Index"
        value={sustainabilityIndex}
        onChange={value => {
          setSustainabilityIndex(value);
          setSustainabilityIndexError('');
        }}
        onBlur={validateInputs}
        error={sustainabilityIndexError}
        placeholder="Enter sustainability index"
      />
      <div>
        <ButtonAddNewProduct onClick={addProduct}>Add</ButtonAddNewProduct>
      </div>
    </div>
  );
};

export default AddProduct;
