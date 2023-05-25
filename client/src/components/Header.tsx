import React from 'react';
import { Title } from '../containers/protectedPage/ProductInfoProps';

const Header: React.FC<Title> = props => {
  return (
    <header className="p-8 bg-grey-green text-white text-center text-xl">
      <h1 className="text-center text-xl font-normal ">{props.title}</h1>
    </header>
  );
};

export default Header;
