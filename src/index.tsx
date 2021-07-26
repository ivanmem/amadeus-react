import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "@vkontakte/vkui/dist/vkui.css";
import { Router } from "@unexp/router";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit", {}).then();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider>
        <AdaptivityProvider>
          <App />
        </AdaptivityProvider>
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
