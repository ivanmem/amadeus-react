import React, { FC } from "react";
import { Panel, PanelHeader, SimpleCell } from "@vkontakte/vkui";
import { useRouter } from "@unexp/router";
import { DefaultPageProps } from "../../helpers/types";

const Main: FC<DefaultPageProps> = (props) => {
  let router = useRouter();

  return (
    <Panel>
      <PanelHeader>Амадеус</PanelHeader>
      <SimpleCell onClick={() => router.push({ panel: "commands" })}>
        Команды
      </SimpleCell>
    </Panel>
  );
};

export default Main;
