"use client";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import QueryProvider from "./QueryClientProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Taskie App</title>
        <meta
          name="description"
          content="a simple task management application"
        />
      </head>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
