import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/search/SearchBar';
import SearchResultList from '../../../components/search/SearchResultList';
import { SearchResultsProps } from '../../../interfaces/SearchResultsProps';

const SearchForProduct = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<SearchResultsProps>({
    searchResults: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch Data Here
    // This gets called each time the search query is changing
    console.log('SearchQuery: ' + searchQuery);
    setFilteredProducts({ searchResults: [] }); // TODO: set here the fetched products
  }, [searchQuery]);

  return (
    <>
      <button
        className="fixed top-0 left-0 ps-4 pt-8"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft className="inline-block text-white text-2xl" />
      </button>
      <div className="p-4">
        <SearchBar setSearchQuery={setSearchQuery} />
        <SearchResultList searchResults={filteredProducts.searchResults} />
      </div>
    </>
  );
};

export default SearchForProduct;
