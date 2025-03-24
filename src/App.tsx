import AppProvider from "./components/@shared/providers/AppProvider";
import AppRouter from "./router";

export default function App() {
  return (
    <div className="hide-scrollbar">
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </div>
  );
}
