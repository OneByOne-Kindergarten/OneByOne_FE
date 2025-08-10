import AppRouter from "@/app/router";
import AppProvider from "@/shared/ui/providers/AppProvider";

export default function App() {
  return (
    <div className="hide-scrollbar">
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </div>
  );
}
