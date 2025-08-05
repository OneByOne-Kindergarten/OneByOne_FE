import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "@/components/@shared/providers/AuthProvider";
import QueryProvider from "@/components/@shared/providers/QueryProvider";
import ScrollToTop from "@/components/@shared/providers/ScrollToTop";
import { Toaster } from "@/components/@shared/toast/toaster";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
