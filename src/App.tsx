import React, { FC } from "react";
import { useStructure, useSwipeBack } from "@unexp/router";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Root,
  View,
} from "@vkontakte/vkui";
import Main from "./common/pages/Main";
import Commands from "./common/pages/Commands";
import { routerNames } from "./common/helpers/router";
import Command from "./common/pages/Command";

const App: FC = () => {
  const structure = useStructure({
    view: routerNames.home.id,
    panel: routerNames.home.commands,
  });
  const withSwipeBack = useSwipeBack();
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Root activeView={structure.view}>
            <View {...withSwipeBack} id="home" activePanel={structure.panel}>
              <Main id={routerNames.home.main} />
              <Commands id={routerNames.home.commands} />
              {/* fixme спасибо vk ui за баги с переходами между одной и той же панелью*/}
              <Command id={routerNames.home.command} />
              <Command id={routerNames.home.command2} />
            </View>
          </Root>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
