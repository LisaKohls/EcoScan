import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { axiosPrivate } from '../../../api/axiosAPI';
import axios from "axios";

interface AddProductProps {
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

const ADD_PRODUCT_URL = '/api/product/add';
const AddProduct: React.FC<AddProductProps> = props => {
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [sustainabilityEco, setsustainabilityEco] = useState('');
  const [sustainabilitySocial, setsustainabilitySocial] = useState('');
  const [description, setDescription] = useState('');

  const testProuct = {
    barcode: 12345678,
    name: 'Product 1',
    description: 'Bla Bla Bla',
    categories: [],
    imageUrls: [],
    sustainabilityName: 'sustainabilityName',
    sustainabilitySocial: 20,
    sustainabilityEco: 20,
  };

  const addProduct = useCallback(async () => {
    try {
      const response = await axiosPrivate.post(ADD_PRODUCT_URL, testProuct, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status == 200) {
        console.log('Product added successfully');
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
  }, [axiosPrivate]);

  console.log('pop up add new product opened');
  // das ganze input Zeug ist noch nicht sichtbar, aber die Komponente wird schon geöffnet
  return (
    <div className="text-black z-10 flex flex-col p-4 overflow-auto">
      <h2 className="mt-5 text-center text-white text-xl">
        Create new product
      </h2>
      <div className="pt-4 text-white">
        <label>
          Barcode Number
          <div className="pt-2">
            <input
              className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
              type="text"
              placeholder="Enter barcode number"
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="pt-4 text-white">
        <label>
          Name of Product
          <div className="pt-2">
            <input
              className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
              type="text"
              placeholder="Enter name of product"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="pt-4 text-white">
        <label>
          Sustainability index
          <div className="pt-2">
            <input
              className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
              type="number"
              placeholder="Enter sustainability index"
              value={sustainabilitySocial}
              onChange={e => setsustainabilitySocial(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="pt-4 text-white">
        <label>
          Sustainability eco
          <div className="pt-2">
            <input
              className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
              type="number"
              placeholder="Enter sustainability index"
              value={sustainabilityEco}
              onChange={e => setsustainabilityEco(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="pt-4 text-white">
        <label>
          Description of Product
          <div className="pt-2">
            <input
              className="w-full p-2 bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
              type="text"
              placeholder="Enter description of product"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="flex justify-center pt-2">
        <button
          className="p-3 px-16 m-5 bg-secondary-color text-black rounded-md"
          onClick={addProduct}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
