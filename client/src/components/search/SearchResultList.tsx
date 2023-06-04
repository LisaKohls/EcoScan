import React from 'react';
import { Result } from '../../containers/protectedPage/InterfaceProps';

const SearchBar: React.FC<Result> = props => {
  if (props.results.length == 0) {
    //wird durch add new product component ersetzt
    return <div>No Entries found</div>;
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
