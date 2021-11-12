import React, { FC, useCallback, useMemo } from "react";
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
import { Command } from "../../helpers/commands/types";

const Commands: FC<DefaultPageProps> = () => {
  const router = useRouter();
  const { search, setSearch } = commandsStore;

  const onPushCommand = useCallback(
    (command: Command) => {
      router.push({ panel: "command" }, { id: command.id });
    },
    [router]
  );

  const searchCommands = useMemo(
    () => commandsService.searchCommand(search),
    [search]
  );

  const onSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (searchCommands.length === 0 || e.key !== "Enter") {
        return;
      }

      onPushCommand(searchCommands[0]);
    },
    [onPushCommand, searchCommands]
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
            autoFocus
            onKeyDown={onSearchKeyDown}
          />
          <List>
            {searchCommands.map((command) => (
              <Cell
                className="alternating-color"
                key={command.id}
                onClick={() => onPushCommand(command)}
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
