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
  };

  return (
    <div className="relative flex items-center rounded-md bg-white shadow-md">
      <FaSearch className="absolute left-3 text-gray-400" />
      <input
        className="w-full py-2 pr-4 pl-10 text-black rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
        type="text"
        placeholder="Enter barcode number or product name"
        value={bufSearchQuery}
        onChange={e => handleChange(e)}
      />
    </div>
  );
};

export default SearchBar;
