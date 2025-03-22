import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./QueryProvider";
import { HelmetProvider } from "react-helmet-async";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <HelmetProvider>
      <QueryProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryProvider>
    </HelmetProvider>
  );
}
