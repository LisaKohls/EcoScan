import { useState } from 'react';
import PopUp from '../../containers/layouts/popup/PopUp';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';
import ButtonPrimary from './ButtonPrimary';

const ButtonAddProduct = () => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  return (
    <div className="flex flex-wrap place-content-center">
      <ButtonPrimary onClick={() => setAddProductPopUp(true)}>
        Add new Product
      </ButtonPrimary>
      <PopUp trigger={addProductPopUp} setTrigger={setAddProductPopUp}>
        <AddProduct onClose={() => setAddProductPopUp(false)} />
      </PopUp>
    </div>
  );
};

export default ButtonAddProduct;
