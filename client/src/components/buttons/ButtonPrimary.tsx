import { ReactNode } from 'react';

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick: () => void;
}

const ButtonPrimary = ({ children, onClick }: ButtonPrimaryProps) => {
  return (
    <div className="flex justify-center">
      <button
        className="center-button hover:bg-green-900 text-white hover:text-white rounded-xl bg-primary-color p-text-between m-margin-elements"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonPrimary;
