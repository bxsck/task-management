"use client";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import QueryProvider from "./QueryClientProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
