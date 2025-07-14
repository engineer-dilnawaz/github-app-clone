import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login(): void;
  logout(): void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login() {},
  logout() {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext value={{ isLoggedIn, login, logout }}>{children}</AuthContext>
  );
};

export const useAuthContext = () => useContext(AuthContext);
