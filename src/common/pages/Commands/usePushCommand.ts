import { useRouter } from "@unexp/router";
import { useCallback } from "react";
import { Command } from "../../helpers/commands/types";

export const usePushCommand = () => {
  const router = useRouter();

  const onPushCommand = useCallback(
    (command: Command) => {
      router.push({ panel: "command" }, { id: command.id }).then();
    },
    [router]
  );

  return { onPushCommand };
};
