import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "@vkontakte/vkui/dist/vkui.css";
import { Router } from "@unexp/router";
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit", {}).then();
bridge.subscribe(({ detail: { type, data } }: any) => {
  if (type === "VKWebAppUpdateConfig") {
    const schemeAttribute = document.createAttribute("scheme");
    schemeAttribute.value = data.scheme ? data.scheme : "client_light";
    document.body.attributes.setNamedItem(schemeAttribute);
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
