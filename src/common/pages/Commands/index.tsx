import React, { FC, useMemo } from "react";
import {
  Cell,
  Div,
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
import { commandsStore } from "./common/CommandsStore";

const Commands: FC<DefaultPageProps> = () => {
  const router = useRouter();
  const { search, setSearch } = commandsStore;
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
      <Div>
        <Group>
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            after={null}
          />
          <List>
            {searchCommands.map((command) => (
              <Cell
                className="alternating-color"
                key={command.id}
                onClick={() =>
                  router.push({ panel: "command" }, { id: command.id })
                }
              >
                {CommandHelper.getCommandFullName(command.id)}
              </Cell>
            ))}
          </List>
        </Group>
      </Div>
    </Panel>
  );
};

export default observer(Commands);
