import { usePushCommand } from "./usePushCommand";
import React, { useCallback } from "react";
import { Command } from "../../helpers/commands/types";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";
import { RichCell } from "@vkontakte/vkui";
import CommandHelper from "../../helpers/commands/CommandHelper";

export const useRenderCommand = () => {
  const { onPushCommand } = usePushCommand();

  const renderCommand = useCallback(
    (command: Command) => {
      return (
        <TextTooltip key={command.id} text={command.helpExtended}>
          <RichCell
            className="alternating-color"
            onClick={() => onPushCommand(command)}
          >
            {CommandHelper.getCommandFullName(command.id)}
          </RichCell>
        </TextTooltip>
      );
    },
    [onPushCommand]
  );

  const renderCommandDescription = useCallback(
    (command: Command) => {
      return (
        <TextTooltip
          key={command.id}
          text={CommandHelper.getCommandFullName(command.id)}
        >
          <RichCell
            className="alternating-color"
            onClick={() => onPushCommand(command)}
          >
            {command.helpExtended}
          </RichCell>
        </TextTooltip>
      );
    },
    [onPushCommand]
  );

  return {
    renderCommand,
    renderCommandDescription,
  };
};
