import { useState } from 'react';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';
import PopUp from '../../containers/layouts/popup/PopUp';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { Product } from '../../interfaces/IProduct';

const SearchResultList = ({ products }: { products: Product[] }) => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  const renderProducts = products.map((product: Product, id: number) => {
    return <div key={id}>{product.name}</div>;
  });

  const renderAddNewProductButton = (
    <div>
      <ButtonPrimary onClick={() => setAddProductPopUp(true)}>
        Add new Product
      </ButtonPrimary>
      <PopUp trigger={addProductPopUp} setTrigger={setAddProductPopUp}>
        <AddProduct setTrigger={setAddProductPopUp} />
      </PopUp>
    </div>
  );
  console.log(`search result list length: ${products.length}`);
  return (
    <div className="p-text-between">
      {products.length !== 0 ? renderProducts : renderAddNewProductButton}
    </div>
  );
};

export default SearchResultList;
