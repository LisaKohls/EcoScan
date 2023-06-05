import { useState } from 'react';
import PopUp from './PopUp';
import AddProductUI from './AddProductUI';

const AddProductBtn = () => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  return (
    <div className="flex flex-wrap place-content-center">
      <button
        className="rounded-full bg-grey-green text-white p-3 m-4 "
        onClick={() => setAddProductPopUp(true)}
      >
        Add new Product
      </button>
      <PopUp trigger={addProductPopUp} setTrigger={setAddProductPopUp}>
        <AddProductUI
          trigger={addProductPopUp}
          setTrigger={setAddProductPopUp}
        />
      </PopUp>
    </div>
  );
};

export default AddProductBtn;
