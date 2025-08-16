import Hotjar from "@hotjar/browser";
import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { worker } from "./mocks/browser.ts";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const startApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// MSW_ENABLED 환경변수가 true인 경우에만 worker 시작
const isMswEnabled = import.meta.env.VITE_MSW_ENABLED === "true";

if (isMswEnabled) {
  worker.start().then(() => {
    startApp();
  });
} else {
  startApp();
}

const siteId = 6472888;
const hotjarVersion = 6;

if (import.meta.env.PROD) {
  Hotjar.init(siteId, hotjarVersion);
}
