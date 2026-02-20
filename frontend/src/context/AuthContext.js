import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncRoleFromPath = () => {
      const path = window.location.pathname;
      if (path.startsWith("/farmer")) {
        setUserRole("farmer");
      } else if (path.startsWith("/official")) {
        setUserRole("officer");
      } else {
        setUserRole(null);
      }
    };

    syncRoleFromPath();
    window.addEventListener("popstate", syncRoleFromPath);
    return () => window.removeEventListener("popstate", syncRoleFromPath);
  }, []);

  const loginFarmer = () => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/farmer/home");
    }
    setUserRole("farmer");
  };

  const loginOfficer = () => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/official/home");
    }
    setUserRole("officer");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/auth/role");
    }
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
