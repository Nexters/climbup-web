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

// MSW가 활성화된 경우에만 worker 시작
// TODO: 추후 환경변수로 관리
worker.start().then(() => {
  startApp();
});

const siteId = 6472888;
const hotjarVersion = 6;

if (import.meta.env.PROD) {
  Hotjar.init(siteId, hotjarVersion);
}
