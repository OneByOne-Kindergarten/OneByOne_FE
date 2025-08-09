import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "@/common/ui/providers/AuthProvider";
import QueryProvider from "@/common/ui/providers/QueryProvider";
import ScrollToTop from "@/common/ui/providers/ScrollToTop";
import { Toaster } from "@/common/ui/toast/toaster";

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
