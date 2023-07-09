import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery?: string;
  focus?: boolean;
}

const SearchBar = ({
  setSearchQuery,
  searchQuery = '',
  focus = false,
}: SearchBarProps) => {
  const [bufSearchQuery, setBufSearchQuery] = useState<string>(searchQuery);
  const searchInput = useRef<HTMLInputElement>(null);
  let debounceTimeout: NodeJS.Timeout | undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBufSearchQuery(e.target.value);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 500);
  };

  useEffect(() => {
    if (searchInput.current) {
      if (focus) {
        searchInput.current.focus();
      } else {
        searchInput.current.blur();
      }
    }
  }, [focus]);

  useEffect(() => {
    setBufSearchQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex justify-center">
      <div className="max-w-lg w-full">
        <div className="relative flex items-center rounded-md bg-white border border-gray-300 mx-margin-elements">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            ref={searchInput}
            className="w-full py-2 pr-4 pl-10 text-black rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary-color"
            type="text"
            placeholder="Enter barcode number or product name"
            value={bufSearchQuery}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
