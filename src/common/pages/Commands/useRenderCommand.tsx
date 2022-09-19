import { usePushCommand } from "./usePushCommand";
import React, { useCallback } from "react";
import { Command } from "../../helpers/commands/types";
import { RichCell } from "@vkontakte/vkui";
import CommandHelper from "../../helpers/commands/CommandHelper";

export const useRenderCommand = () => {
  const { onPushCommand } = usePushCommand();

  const renderCommand = useCallback(
    (command: Command) => {
      return (
        <RichCell
          key={command.id}
          caption={command.helpExtended}
          onClick={() => onPushCommand(command)}
        >
          {CommandHelper.getCommandFullName(command.id)}
        </RichCell>
      );
    },
    [onPushCommand]
  );

  const renderCommandDescription = useCallback(
    (command: Command) => {
      return (
        <RichCell
          key={command.id}
          caption={CommandHelper.getCommandFullName(command.id)}
          onClick={() => onPushCommand(command)}
        >
          {command.helpExtended}
        </RichCell>
      );
    },
    [onPushCommand]
  );

  return {
    renderCommand,
    renderCommandDescription,
  };
};
