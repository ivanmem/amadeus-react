import React, { FC } from "react";
import { Cell, List, Panel, PanelHeader, SimpleCell } from "@vkontakte/vkui";
import { useRouter } from "@unexp/router";
import { DefaultPageProps } from "../../helpers/types";
import commandsService from "../../services/CommandsService";
import { observer } from "mobx-react-lite";

const Commands: FC<DefaultPageProps> = () => {
  let router = useRouter();
  const commands = commandsService.commands;
  return (
    <Panel>
      <PanelHeader>Команды</PanelHeader>
      <SimpleCell onClick={() => router.push({ panel: "main" })}>
        Назад
      </SimpleCell>
      <List>
        {commands.map((command) => (
          <Cell
            onClick={() =>
              router.push({ panel: "command" }, { id: command.id })
            }
          >
            {command.alias[0]}
          </Cell>
        ))}
      </List>
    </Panel>
  );
};

export default observer(Commands);
