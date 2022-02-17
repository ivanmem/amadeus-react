import { Header, List, ScreenSpinner } from "@vkontakte/vkui";
import commandsService from "../../services/CommandsService";
import React, { useCallback, useMemo } from "react";
import { useCommandSearch } from "./useCommandSearch";
import { useRenderCommand } from "./useRenderCommand";

export const useRenderSearchResult = () => {
  const {
    search,
    searchDebounced,
    setSearch,
    onSearchKeyDown,
    isSearch,
    isSearchSuccess,
    searchCommands,
    searchDescriptions,
  } = useCommandSearch();

  const { renderCommand, renderCommandDescription } = useRenderCommand();

  const renderSearchResult = useMemo(() => {
    if (search !== searchDebounced) return <ScreenSpinner />;

    if (!isSearch) {
      return <List>{commandsService.commands.map(renderCommand)}</List>;
    }

    if (!isSearchSuccess) {
      return <Header>Поиск не дал результатов</Header>;
    }

    return (
      <>
        {Boolean(searchCommands.length) && (
          <>
            <Header>Совпадение по названию:</Header>
            <List>{searchCommands.map(renderCommand)}</List>
          </>
        )}
        {Boolean(searchDescriptions.length) && (
          <>
            <Header>Совпадение по описанию:</Header>
            <List>{searchDescriptions.map(renderCommandDescription)}</List>
          </>
        )}
      </>
    );
  }, [
    isSearch,
    isSearchSuccess,
    renderCommand,
    renderCommandDescription,
    search,
    searchCommands,
    searchDebounced,
    searchDescriptions,
  ]);

  return {
    search,
    setSearch,
    onSearchKeyDown,
    renderSearchResult,
  };
};
