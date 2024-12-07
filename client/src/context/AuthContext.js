"use client";

import { createContext, useContext, useState } from "react";
import { getAuthToken, clearAuthToken } from "../lib/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());

  const login = (userData) => {
    console.log(userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
