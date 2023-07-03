import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

interface AddProductProps {
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProps> = props => {
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [sustainabilityEco, setsustainabilityEco] = useState('');
  const [sustainabilitySocial, setsustainabilitySocial] = useState('');
  const [description, setDescription] = useState('');

  const add = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Verhindert das Absenden des Formulars

    const config = {
      headers: {
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6ImphbmEiLCJyb2xlcyI6WzUxNTAsMjAwMV19LCJpYXQiOjE2ODgwMzY4MTQsImV4cCI6MTY4ODAzODYxNH0.iv7h-2Q9ntEgTdw0EhY9ADnDxjbnTPVrU2_FTwmCKYs'}`,
      },
    };

    try {
      await axios.post(
        '/api/product/add',
        {
          barcode: '378',
          categories: [],
          description: 'Bla Bla Bla',
          imageUrls: [],
          sustainabilityName: 'sustainabilityName',
          name: 'Product 1',
          sustainabilitySocial: 20,
          sustainabilityEco: 20,
        },
        config
      );
      // Produkt erfolgreich hinzugefügt
      props.setTrigger(false);
    } catch (error) {
      // Fehler beim Hinzufügen des Produkts
      console.error(error);
    }
  };

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
          onClick={add}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
