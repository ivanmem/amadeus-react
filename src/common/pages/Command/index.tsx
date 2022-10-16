import React, { FC } from "react";
import {
  Button,
  Div,
  Group,
  Header,
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
        before={<PanelHeaderBack onClick={router.back} />}
        after={
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
        <Group>
          <SimpleCell disabled multiline>
            <InfoRow header="📎 Описание">{command.helpExtended}</InfoRow>
          </SimpleCell>
          <SimpleCell disabled multiline>
            <InfoRow
              header={`💬 Названия${
                command.strictAliasMode ? " (опечатки запрещены)" : ""
              }`}
            >
              {command.alias.join(", ")}
            </InfoRow>
          </SimpleCell>

          <SimpleCell disabled multiline>
            <InfoRow header="🔧 Аргументы">{command.help}</InfoRow>
          </SimpleCell>

          <SimpleCell disabled multiline>
            <InfoRow header="⚠ Требуемая роль">
              {CommandHelper.getLevelText(command.accessLevel)}
            </InfoRow>
          </SimpleCell>

          {!!command.modifiers?.length && (
            <SimpleCell disabled multiline>
              <InfoRow header="⚡ Модификаторы">
                <Div className="row-gap5 overflow">
                  {command.modifiers.map((commandImplicitId) => (
                    <Button
                      key={commandImplicitId}
                      style={{ padding: 0 }}
                      onClick={() => pushCommandPanel(commandImplicitId)}
                    >
                      {
                        commandsService.getCommandById(commandImplicitId)
                          .alias[0]
                      }
                    </Button>
                  ))}
                </Div>
              </InfoRow>
            </SimpleCell>
          )}

          {!!command.commandImplicit?.length && (
            <SimpleCell disabled multiline>
              {command.commandImplicit.map((commandImplicit) => (
                <InfoRow
                  key={commandImplicit.alias[0]}
                  header="⚡ Неявный модификатор"
                >
                  <SimpleCell disabled multiline>
                    <InfoRow header="💬 Названия">
                      {commandImplicit.alias.join(", ")}
                    </InfoRow>
                  </SimpleCell>
                  <SimpleCell disabled multiline>
                    <InfoRow header="📎 Описание">
                      {commandImplicit.helpExtended}
                    </InfoRow>
                  </SimpleCell>
                  <SimpleCell disabled multiline>
                    <InfoRow header="❓ Использование">
                      {commandImplicit.help}
                    </InfoRow>
                  </SimpleCell>
                </InfoRow>
              ))}
            </SimpleCell>
          )}

          {!!command.relatedCommands?.length && (
            <SimpleCell disabled multiline>
              <InfoRow header="🖇 Связанные команды">
                {
                  <Div className="row-gap5 overflow">
                    {command.relatedCommands
                      .filter((x) => x != command.id)
                      .map((relatedCommandId) => (
                        <Button
                          key={relatedCommandId}
                          onClick={() => pushCommandPanel(relatedCommandId)}
                        >
                          {
                            commandsService.getCommandById(relatedCommandId)
                              .alias[0]
                          }
                        </Button>
                      ))}
                  </Div>
                }
              </InfoRow>
            </SimpleCell>
          )}

          <SimpleCell disabled multiline>
            <InfoRow header={`✏ Полный пример (со всеми аргументами)`}>
              <pre style={{ userSelect: "contain" }}>
                {command.templateString}
              </pre>
            </InfoRow>
          </SimpleCell>
          {command.templateString != command.minTemplateString && (
            <SimpleCell disabled multiline>
              <InfoRow
                header={`✏ Минимальный пример (только с обязательными аргументами)`}
              >
                <pre style={{ userSelect: "contain" }}>
                  {command.minTemplateString}
                </pre>
              </InfoRow>
            </SimpleCell>
          )}

          {command.keys?.map((key) => (
            <SimpleCell key={key.alias[0]} disabled multiline>
              <InfoRow header={`🔑 ${key.alias.join(", ")}`}>
                {key.description}
              </InfoRow>
            </SimpleCell>
          ))}

          <SimpleCell disabled multiline>
            <InfoRow header="🛠 Тип">
              {CommandHelper.getType(command.type)}
            </InfoRow>
          </SimpleCell>

          {command.repeat === RepeatCommandConversationEnum.Yes && (
            <Header mode="primary" multiline>
              🆘 Повторяет ответ в беседе, если была успешно выполнена в личных
              сообщениях.
            </Header>
          )}

          {CommandHelper.isAccessLs(command.privateMessages) && (
            <Header mode="primary" multiline>
              👁 Разрешена всем ролям в личных сообщениях бота
              {command.privateMessages ===
              PermissionPrivateMessagesTypeEnum.YesImportant
                ? " (принудительно)"
                : ""}
            </Header>
          )}

          {command.notPrivateMessages && (
            <Header mode="primary" multiline>
              🚦 Можно использовать только в беседе.
            </Header>
          )}

          {command.onlyPrivateMessages && (
            <Header mode="primary" multiline>
              🚦 Можно использовать только в личных сообщениях бота.
            </Header>
          )}
        </Group>
      </Div>
    </Panel>
  );
};

export default observer(Command);
