import { SearchResultsProps } from '../../interfaces/SearchResultsProps';
import ButtonAddProduct from '../buttons/ButtonAddProduct';

const SearchResultList = ({ searchResults }: SearchResultsProps) => {
  const renderProducts = searchResults.map((result, id) => {
    return <div key={id}>{result.name}</div>;
  });

  const renderAddNewProductButton = <ButtonAddProduct />;

  return (
    <div className="p-2">
      {searchResults.length !== 0 ? renderProducts : renderAddNewProductButton}
    </div>
  );
};

export default SearchResultList;
