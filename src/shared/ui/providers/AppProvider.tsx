import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "@/shared/ui/providers/AuthProvider";
import QueryProvider from "@/shared/ui/providers/QueryProvider";
import ScrollToTop from "@/shared/ui/providers/ScrollToTop";
import { Toaster } from "@/shared/ui/toast/toaster";

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
