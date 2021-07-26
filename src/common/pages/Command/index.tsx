import React, { FC } from "react";
import {
  CardScroll,
  Cell,
  Div,
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
import { Icon28AddOutline } from "@vkontakte/icons";
import CommandHelper from "../../helpers/commands/CommandHelper";
import {
  PermissionPrivateMessagesTypeEnum,
  RepeatCommandConversationEnum,
} from "../../helpers/commands/types";
import { observer } from "mobx-react-lite";

const Command: FC<DefaultPageProps> = () => {
  const { id } = useParams();
  const command = commandsService.getCommandById(id);
  const router = useRouter();
  const location = useLocation();

  const pushCommandPanel = (id: number) => {
    // fixme спасибо vk ui за баги с переходами между одной и той же панелью
    router
      .push(
        { panel: location.panel === "command" ? "command2" : "command" },
        { id: id }
      )
      .then();
  };

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
      <Div>
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
            description={
              <CardScroll>
                {command.modifiers.map((commandImplicitId) => (
                  <Cell
                    className="alternating-color"
                    key={commandImplicitId}
                    onClick={() => pushCommandPanel(commandImplicitId)}
                  >
                    {commandsService.getCommandById(commandImplicitId).alias[0]}
                  </Cell>
                ))}
              </CardScroll>
            }
          />
        )}
        {!!command.commandImplicit?.length && (
          <Group
            header={<Header>⚡ Неявный модификатор</Header>}
            description={command.commandImplicit.map((commandImplicit) => (
              <>
                <Group
                  header={<Header>💬 Названия</Header>}
                  description={commandImplicit.alias.join(", ")}
                />
                <Group
                  header={<Header>📎 Описание</Header>}
                  description={commandImplicit.helpExtended}
                />
                <Group
                  header={<Header>❓ Использование</Header>}
                  description={commandImplicit.help}
                />
              </>
            ))}
          />
        )}
        {!!command.relatedCommands?.length && (
          <Group
            header={<Header>🖇 Связанные команды</Header>}
            description={
              <CardScroll>
                {command.relatedCommands
                  .filter((x) => x != command.id)
                  .map((relatedCommandId) => (
                    <Cell
                      className="alternating-color"
                      key={relatedCommandId}
                      onClick={() => pushCommandPanel(relatedCommandId)}
                    >
                      {
                        commandsService.getCommandById(relatedCommandId)
                          .alias[0]
                      }
                    </Cell>
                  ))}
              </CardScroll>
            }
          />
        )}
        {command.keys?.map((key) => (
          <Group
            key={key.alias[0]}
            header={
              <Header mode="primary" multiline>
                🔑 {key.alias.join(", ")}
              </Header>
            }
            description={key.description}
          />
        ))}
        <Group
          header={<Header>🛠 Тип</Header>}
          description={CommandHelper.getType(command.type)}
        />
        {command.repeat === RepeatCommandConversationEnum.Yes && (
          <Group
            header={
              <Header mode="primary" multiline>
                🆘 Повторяет ответ в беседе, если была успешно выполнена в
                личных сообщениях.
              </Header>
            }
          />
        )}
        {CommandHelper.isAccessLs(command.privateMessages) && (
          <Group
            header={
              <Header mode="primary" multiline>
                👁 Разрешена всем ролям в личных сообщениях бота
                {command.privateMessages ===
                PermissionPrivateMessagesTypeEnum.YesImportant
                  ? " (принудительно)"
                  : ""}
              </Header>
            }
          />
        )}
        {command.notPrivateMessages && (
          <Group
            header={
              <Header mode="primary" multiline>
                🚦 Можно использовать только в беседе.
              </Header>
            }
          />
        )}
        {command.onlyPrivateMessages && (
          <Group
            header={
              <Header mode="primary" multiline>
                🚦 Можно использовать только в личных сообщениях бота.
              </Header>
            }
          />
        )}
      </Div>
    </Panel>
  );
};

export default observer(Command);
