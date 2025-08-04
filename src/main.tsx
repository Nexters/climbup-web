import Hotjar from "@hotjar/browser";
import { Theme } from "@radix-ui/themes";
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
      <Theme scaling="100%">
        <App />
      </Theme>
    </React.StrictMode>
  );
};

// MSW가 활성화된 경우에만 worker 시작
if (__MSW_ENABLED__) {
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
