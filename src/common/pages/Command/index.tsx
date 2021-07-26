import React, { FC } from "react";
import {
  Cell,
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { useLocation, useParams, useRouter } from "@unexp/router";
import { DefaultPageProps } from "../../helpers/types";
import commandsService from "../../services/CommandsService";
import { observer } from "mobx-react-lite";
import { Icon28AddOutline } from "@vkontakte/icons";
import CommandHelper from "../../helpers/commands/CommandHelper";

const Command: FC<DefaultPageProps> = () => {
  const { id } = useParams();
  const command = commandsService.getCommandById(id);
  const router = useRouter();
  const location = useLocation();
  return (
    <Panel>
      <PanelHeader
        left={<PanelHeaderBack onClick={router.back} />}
        right={
          <PanelHeaderButton>
            <Icon28AddOutline />
          </PanelHeaderButton>
        }
      >
        <PanelHeaderContent>
          {CommandHelper.getCommandFullName(id)}
        </PanelHeaderContent>
      </PanelHeader>
      <Group
        header={<Header>📎 Описание</Header>}
        description={command.helpExtended}
      />
      <Group
        header={
          <Header>{`💬 Названия${
            command.strictAliasMode ? " (опечатки запрещены)" : ""
          }`}</Header>
        }
        description={command.alias.join(", ")}
      />
      <Group
        header={<Header>🔧 Аргументы</Header>}
        description={command.help}
      />
      <Group
        header={<Header>⚠ Требуемая роль</Header>}
        description={CommandHelper.getLevelText(command.accessLevel)}
      />
      {!!command.modifiers?.length && (
        <Group
          header={<Header>⚡ Модификаторы</Header>}
          description={command.modifiers.map((commandImplicitId) => (
            <Cell
              onClick={() => {
                router.push(
                  {
                    // fixme спасибо vk ui за баги с переходами между одной и той же панелью
                    panel:
                      location.panel === "command" ? "command2" : "command",
                  },
                  { id: commandImplicitId }
                );
              }}
            >
              {commandsService.getCommandById(commandImplicitId).alias[0]}
            </Cell>
          ))}
        />
      )}
    </Panel>
  );
};

export default observer(Command);
