import { createContext, useContext, useState } from "react";

// 1. Create Context
const AuthContext = createContext();

// 2. Provide it
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ name: username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook
export const useAuth = () => useContext(AuthContext);