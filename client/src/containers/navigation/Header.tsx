import React from 'react';

interface Title {
  title: string;
}

const Header: React.FC<Title> = props => {
  return (
    <header className="p-8 bg-primary-color text-white text-center text-xl">
      <h1 className="text-center text-xl font-normal ">{props.title}</h1>
    </header>
  );
};

export default Header;
