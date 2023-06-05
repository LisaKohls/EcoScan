import React, { useEffect, useState } from 'react';
import ProductCard from '../../../components/productcard/ProductCard';
import img from '../../../assets/bio_nut_butter_bar.png';
import SearchBar from '../../../components/search/SearchBar';

const Favorites: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // TODO: do something when search is input
  }, [searchQuery]);

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-2 gap-4 p-4">
        <ProductCard img={img} index={40} name="Riegel" />
        <ProductCard img={img} index={40} name="Riegel" />
        <ProductCard img={img} index={40} name="Riegel" />
      </div>
    </>
  );
};

export default Favorites;
