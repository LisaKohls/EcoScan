import React, { useState } from 'react';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';
import PopUp from '../../containers/layouts/popup/PopUp';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { Product } from '../../interfaces/IProduct';
import ProductContainer from '../../containers/productcontainer/ProductContainer';

const SearchResultList = ({
  products,
  searchQuery,
}: {
  products: Product[];
  searchQuery: string;
}) => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);

  return (
    <div className="pt-4 m-margin-elements">
      {products.length !== 0 ? (
        <ProductContainer products={products} />
      ) : (
        <div className="mt-4 text-center">
          <p className="mb-2 text-gray-500">
            No products found for &quot;{searchQuery}&quot;
          </p>
          <ButtonPrimary onClick={() => setAddProductPopUp(true)}>
            Add new Product
          </ButtonPrimary>
          <PopUp trigger={addProductPopUp} setTrigger={setAddProductPopUp}>
            <AddProduct setTrigger={setAddProductPopUp} />
          </PopUp>
        </div>
      )}
    </div>
  );
};

export default SearchResultList;
