import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);

  const loginFarmer = () => {
    setUserRole("farmer");
  };

  const loginOfficer = () => {
    setUserRole("officer");
  };

  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        loginFarmer,
        loginOfficer,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
