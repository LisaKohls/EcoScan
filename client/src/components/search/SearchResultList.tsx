import React, { useState } from 'react';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';
import PopUp from '../../containers/layouts/popup/PopUp';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { Product } from '../../interfaces/IProduct';
import ProductCard from '../productcard/ProductCard';
import ProductContainer from '../../containers/productcontainer/ProductContainer';

const SearchResultList = ({ products }: { products: Product[] }) => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);

  return (
    <>
      {products.length !== 0 ? (
        <ProductContainer products={products} />
      ) : (
        <div className="items-center">
          <ButtonPrimary onClick={() => setAddProductPopUp(true)}>
            Add new Product
          </ButtonPrimary>
          <PopUp trigger={addProductPopUp} setTrigger={setAddProductPopUp}>
            <AddProduct setTrigger={setAddProductPopUp} />
          </PopUp>
        </div>
      )}
    </>
  );
};

export default SearchResultList;
