import { ReactNode } from 'react';

interface ButtonAddNewProductProps {
  children: ReactNode;
  onClick: () => void;
}

const ButtonAddNewProduct = ({
  children,
  onClick,
}: ButtonAddNewProductProps) => {
  return (
    <div className="flex justify-center">
      <button
        className=" px-16 center-button hover:bg-primary-dark text-secondary-color hover:text-white rounded-3xl border-2 border-secondary-color hover:bg-secondary-color p-text-between m-margin-elements transition ease-in-out duration-300"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonAddNewProduct;
