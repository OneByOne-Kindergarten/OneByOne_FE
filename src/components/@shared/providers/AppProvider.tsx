import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import QueryProvider from "@/components/@shared/providers/QueryProvider";
import AuthProvider from "@/components/@shared/providers/AuthProvider";
import { Toaster } from "@/components/@shared/toast/toaster";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <QueryProvider>
        <HelmetProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </HelmetProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
