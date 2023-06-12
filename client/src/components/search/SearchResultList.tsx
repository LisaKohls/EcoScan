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
  console.log(`search result list length: ${searchResults.length}`);
  return (
    <div className="p-text-between">
      {searchResults.length !== 1 ? renderProducts : renderAddNewProductButton}
    </div>
  );
};

export default SearchResultList;
