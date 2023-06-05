import React from 'react';
import { Result } from '../../containers/protectedPage/InterfaceProps';
import AddProductBtn from '../popUp/AddProductBtn';

const SearchBar: React.FC<Result> = props => {
  if (props.results.length == 0) {
    return <AddProductBtn />;
  }
  return (
    <div className="p-2">
      {props.results.map((result, id) => {
        //if(result.name != null)
        return <div key={id}>{result.name}</div>;
      })}
    </div>
  );
};

export default SearchBar;
