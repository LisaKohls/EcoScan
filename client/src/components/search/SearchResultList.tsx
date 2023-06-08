import { SearchResultsProps } from '../../interfaces/SearchResultsProps';
import { useState } from 'react';
import AddProduct from '../../containers/popupcontent/addproduct/AddProduct';
import PopUp from '../../containers/layouts/popup/PopUp';
import ButtonPrimary from '../buttons/ButtonPrimary';

const SearchResultList = ({ searchResults }: SearchResultsProps) => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  const renderProducts = searchResults.map((result, id) => {
    return <div key={id}>{result.name}</div>;
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

  return (
    <div className="p-text-between">
      {searchResults.length !== 0 ? renderProducts : renderAddNewProductButton}
    </div>
  );
};

export default SearchResultList;
