import "@/app/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/app";
import { initSentry } from "@/shared/utils/sentryConfig";

initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
