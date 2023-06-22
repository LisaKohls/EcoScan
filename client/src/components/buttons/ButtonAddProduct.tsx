import { useState } from 'react';
import PopUp from '../../containers/layouts/popup/PopUp';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';

const ButtonAddProduct = () => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  return (
    <div className="flex flex-wrap place-content-center">
      <button
        className="rounded-full bg-primary-color hover:secondary-dark text-white p-3 m-4 "
        onClick={() => setAddProductPopUp(true)}
      >
        Add new Product
      </button>
      <PopUp trigger={addProductPopUp} setTrigger={setAddProductPopUp}>
        <AddProduct setTrigger={setAddProductPopUp} />
      </PopUp>
    </div>
  );
};

export default ButtonAddProduct;
