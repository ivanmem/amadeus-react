import { Group, Header, List, ScreenSpinner } from "@vkontakte/vkui";
import { Icon12ErrorCircle } from "@vkontakte/icons";
import commandsService from "../../services/CommandsService";
import React, { useMemo } from "react";
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
          <Group
            header={
              <Header>
                <div className="row-gap5">
                  <Icon12ErrorCircle />
                  Совпадение по названию:
                </div>
              </Header>
            }
          >
            <List>{searchCommands.map(renderCommand)}</List>
          </Group>
        )}
        {Boolean(searchDescriptions.length) && (
          <Group
            header={
              <Header>
                <div className="row-gap5">
                  <Icon12ErrorCircle />
                  Совпадение по описанию:
                </div>
              </Header>
            }
          >
            <List>{searchDescriptions.map(renderCommandDescription)}</List>
          </Group>
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
