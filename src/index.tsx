import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/components.css";
import { Router } from "@unexp/router";
import bridge from "@vkontakte/vk-bridge";
import CommandsService from "./common/services/CommandsService";

async function init() {
  bridge.send("VKWebAppInit", {}).then();
  bridge.subscribe(({ detail: { type, data } }: any) => {
    if (type !== "VKWebAppUpdateConfig") {
      return;
    }

    const schemeAttribute = document.createAttribute("scheme");
    schemeAttribute.value = data.scheme ? data.scheme : "client_light";
    document.body.attributes.setNamedItem(schemeAttribute);
    document.getElementById("root")!.style.opacity = "1";
  });
  await CommandsService.init();
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

init().then();
