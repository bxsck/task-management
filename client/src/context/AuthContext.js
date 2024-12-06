"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken, clearAuthToken } from "../lib/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
