import React from 'react';
import { Result } from '../../containers/protectedPage/InterfaceProps';

const SearchBar: React.FC<Result> = props => {
  if (props.results.length == 0) {
    return null;
  }
  return (
    <div className="p-2">
      {props.results.map((result, id) => {
        return <div key={id}>{result.name}</div>;
      })}
    </div>
  );
};

export default SearchBar;
