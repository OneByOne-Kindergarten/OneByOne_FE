import * as Sentry from "@sentry/react";

import AppRouter from "@/app/router";
import AppErrorFallback from "@/shared/ui/layout/error/AppErrorFallback";
import AppProvider from "@/shared/ui/providers/AppProvider";

export default function App() {
  return (
    <div className="hide-scrollbar">
      <AppProvider>
        <Sentry.ErrorBoundary fallback={AppErrorFallback} showDialog>
          <AppRouter />
        </Sentry.ErrorBoundary>
      </AppProvider>
    </div>
  );
}
