import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/layout.tsx";
import StoreProvider from "./layouts/providers.tsx";
import "./assets/fonts/fonts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <DashboardLayout>
          <App />
        </DashboardLayout>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);
