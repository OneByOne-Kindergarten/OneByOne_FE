import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./QueryProvider";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "@/components/@shared/providers/AuthProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <HelmetProvider>
      <QueryProvider>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </QueryProvider>
    </HelmetProvider>
  );
}
