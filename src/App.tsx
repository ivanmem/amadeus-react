import React from "react";
import { useStructure, useSwipeBack } from "@unexp/router";
import { AppRoot, Root, View } from "@vkontakte/vkui";
import Main from "./common/pages/Main";
import Commands from "./common/pages/Commands";
import { routerNames } from "./common/helpers/router";
import Command from "./common/pages/Command";

function App() {
  const structure = useStructure({
    view: routerNames.home.id,
    panel: routerNames.home.commands,
  });
  let withSwipeBack = useSwipeBack();

  return (
    <AppRoot>
      <Root popout={structure.popout} activeView={structure.view}>
        <View {...withSwipeBack} id="home" activePanel={structure.panel}>
          <Main id={routerNames.home.main} />
          <Commands id={routerNames.home.commands} />
          {/* fixme спасибо vk ui за баги с переходами между одной и той же панелью*/}
          <Command id={routerNames.home.command} />
          <Command id={routerNames.home.command2} />
        </View>
      </Root>
    </AppRoot>
  );
}

export default App;
