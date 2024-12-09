"use client";
import { AuthProvider } from "../../context/AuthContext";
import QueryProvider from "./QueryClientProvider";

const ProviderWrapper = ({ children }) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};

export default ProviderWrapper;
