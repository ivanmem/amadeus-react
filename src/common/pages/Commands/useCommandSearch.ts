import { commandsStore } from "./common/CommandsStore";
import React, { useCallback, useMemo } from "react";
import commandsService from "../../services/CommandsService";
import { usePushCommand } from "./usePushCommand";
import { useDebounce } from "../../hooks/useDebounce";

export const useCommandSearch = () => {
  const { onPushCommand } = usePushCommand();

  const { search, setSearch } = commandsStore;

  const searchDebounced = useDebounce(search, 200);

  const searchCommands = useMemo(
    () => commandsService.searchCommand(searchDebounced),
    [searchDebounced]
  );

  const searchDescriptions = useMemo(
    () => commandsService.searchDescription(searchDebounced),
    [searchDebounced]
  );

  const onSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const firstCommand = searchCommands[0] || searchDescriptions[0];
      if (!firstCommand || e.key !== "Enter") {
        return;
      }

      onPushCommand(firstCommand);
    },

    [onPushCommand, searchCommands, searchDescriptions]
  );

  const isSearch = Boolean(search.trim().length);

  const isSearchSuccess = Boolean(
    searchCommands.length || searchDescriptions.length
  );

  return {
    search,
    searchDebounced,
    setSearch,
    searchCommands,
    searchDescriptions,
    onSearchKeyDown,
    isSearch,
    isSearchSuccess,
  };
};
