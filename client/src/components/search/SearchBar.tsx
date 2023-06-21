import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
  const [bufSearchQuery, setBufSearchQuery] = useState<string>('');
  let debounceTimeout: NodeJS.Timeout | undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBufSearchQuery(e.target.value);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 500);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-text-between">
      <FaSearch id="search-icon" className="absolute right-10 mt-5 w-5 h-5 " />
      <input
        className="w-full p-text-between bg-white text-black border-2 border-grey rounded-md focus:outline-none focus:border-black"
        type="text"
        placeholder="Enter barcode number"
        value={bufSearchQuery}
        onChange={e => handleChange(e)}
      />
    </div>
  );
};

export default SearchBar;
