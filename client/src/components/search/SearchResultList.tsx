import { useState } from 'react';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';
import PopUp from '../../containers/layouts/popup/PopUp';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { Product } from '../../interfaces/IProduct';
import ProductCard from '../productcard/ProductCard';

const SearchResultList = ({ products }: { products: Product[] }) => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  const renderProducts = products.map((product: Product, id: number) => {
    return (
      <div key={id}>
        <ProductCard
          img={product.image}
          index={product.sustainabilityEco}
          name={product.name}
        />
      </div>
    );
  });

  const renderAddNewProductButton = (
    <div className="items-center">
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
    <div className="grid grid-cols-2 gap-4 p-text-between md:grid-cols-3 lg:grid-cols-4">
      {products.length !== 0 ? renderProducts : renderAddNewProductButton}
    </div>
  );
};

export default SearchResultList;
