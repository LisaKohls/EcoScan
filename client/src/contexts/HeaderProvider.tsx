import React, { ReactNode, useState } from 'react';

type HeaderContextProps = {
  title: string;
  backButton: boolean;
  rightIcon: JSX.Element | null;
  setHeaderOptions: (options: {
    title: string;
    backButton: boolean;
    rightIcon: JSX.Element | null;
  }) => void;
};

const HeaderContext = React.createContext<HeaderContextProps>({
  title: '',
  backButton: false,
  rightIcon: null,
  setHeaderOptions: () => {
    /* Intentionally empty */
  },
});

type HeaderProviderProps = {
  children: ReactNode;
};

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [title, setTitle] = useState('EcoScan');
  const [backButton, setBackButton] = useState(false);
  const [rightIcon, setRightIcon] = useState<JSX.Element | null>(null);

  const setHeaderOptions = (options: {
    title: string;
    backButton: boolean;
    rightIcon: JSX.Element | null;
  }) => {
    setTitle(options.title);
    setBackButton(options.backButton);
    setRightIcon(options.rightIcon);
  };

  return (
    <HeaderContext.Provider
      value={{ title, backButton, rightIcon, setHeaderOptions }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContext;
