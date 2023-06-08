import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/search/SearchBar';
import SearchResultList from '../../../components/search/SearchResultList';
import { SearchResultsProps } from '../../../interfaces/SearchResultsProps';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const SearchForProduct = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<SearchResultsProps>({
    searchResults: [],
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // This gets called each time the search query is changing

    const fetchData = async (url: string) => {
      setLoading(true);
      try {
        const { data: response } = await axiosPrivate.get(url);
        setFilteredProducts({ searchResults: [response] });
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData(
      isNaN(Number(searchQuery))
        ? `http://localhost:3001/api/product?name=${searchQuery}`
        : `http://localhost:3001/api/product/${searchQuery}`
    );

    console.log('SearchQuery: ' + searchQuery);
  }, [axiosPrivate, searchQuery]);

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
        {loading && <div>Loading...</div>}
        {filteredProducts && (
          <SearchResultList searchResults={filteredProducts.searchResults} />
        )}
      </div>
    </>
  );
};

export default SearchForProduct;
