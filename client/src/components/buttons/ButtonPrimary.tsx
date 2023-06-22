import { ReactNode } from 'react';

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick: () => void;
}

const ButtonPrimary = ({ children, onClick }: ButtonPrimaryProps) => {
  return (
    <div className="flex justify-center">
      <button
        className="center-button hover:bg-secondary-dark text-white hover:text-white rounded-xl bg-primary-color p-text-between m-margin-elements transition ease-in-out duration-300"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonPrimary;
