import React, { FC } from "react";
import {
  Cell,
  Group,
  InfoRow,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  PanelHeaderContent,
  SimpleCell,
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
      <Group>
        <SimpleCell>
          <InfoRow header="📎 Описание">{command.helpExtended}</InfoRow>
        </SimpleCell>
      </Group>
      <Group>
        <SimpleCell>
          <InfoRow
            header={`💬 Названия${
              command.strictAliasMode ? " (опечатки запрещены)" : ""
            }`}
          >
            {command.alias.join(", ")}
          </InfoRow>
        </SimpleCell>
      </Group>
      <Group>
        <SimpleCell>
          <InfoRow header="🔧 Аргументы">{command.help}</InfoRow>
        </SimpleCell>
      </Group>
      <Group>
        <SimpleCell>
          <InfoRow header="⚠ Требуемая роль">
            {CommandHelper.getLevelText(command.accessLevel)}
          </InfoRow>
        </SimpleCell>
      </Group>
      {!!command.modifiers?.length && (
        <Group>
          <SimpleCell>
            <InfoRow header="⚡ Модификаторы">
              {command.modifiers.map((commandImplicitId) => (
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
            </InfoRow>
          </SimpleCell>
        </Group>
      )}
    </Panel>
  );
};

export default observer(Command);
