import React, { FC, useMemo, useState } from "react";
import {
  Cell,
  Group,
  List,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Search,
} from "@vkontakte/vkui";
import { useRouter } from "@unexp/router";
import { DefaultPageProps } from "../../helpers/types";
import commandsService from "../../services/CommandsService";
import { observer } from "mobx-react-lite";
import { Icon28AddOutline } from "@vkontakte/icons";
import CommandHelper from "../../helpers/commands/CommandHelper";

const Commands: FC<DefaultPageProps> = () => {
  let router = useRouter();
  const [search, setSearch] = useState("");
  const searchCommands = useMemo(
    () => commandsService.searchCommand(search),
    [search]
  );

  return (
    <Panel>
      <PanelHeader
        right={
          <PanelHeaderButton>
            <Icon28AddOutline />
          </PanelHeaderButton>
        }
      >
        Команды
      </PanelHeader>
      <Group>
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          after={null}
        />
        <List>
          {searchCommands.map((command) => (
            <Cell
              onClick={() =>
                router.push({ panel: "command" }, { id: command.id })
              }
            >
              {CommandHelper.getCommandFullName(command.id)}
            </Cell>
          ))}
        </List>
      </Group>
    </Panel>
  );
};

export default observer(Commands);
