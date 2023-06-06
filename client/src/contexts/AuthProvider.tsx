import {
  createContext,
  ReactNode,
  SetStateAction,
  useState,
  Dispatch,
} from 'react';

interface IAuth {
  username: string;
  accessToken: string;
}

export interface AuthContextType {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {
    username: '',
    accessToken: '',
  },
  setAuth: () => {
    console.error('Empty Auth');
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({
    username: '',
    accessToken: '',
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
