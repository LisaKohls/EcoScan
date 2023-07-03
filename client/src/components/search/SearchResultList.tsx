import { useState } from 'react';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';
import PopUp from '../../containers/layouts/popup/PopUp';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { Product } from '../../interfaces/IProduct';
import ProductContainer from '../../containers/productcontainer/ProductContainer';

const SearchResultList = ({
  products,
  searchQuery,
  loading,
}: {
  products: Product[];
  searchQuery: string;
  loading: boolean;
}) => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);

  return (
    <div className="pt-4 m-margin-elements">
      {loading ? (
        <p className="mt-2 text-center text-gray-500 ">Loading...</p>
      ) : products.length !== 0 ? (
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
