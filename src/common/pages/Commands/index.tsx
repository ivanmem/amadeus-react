import React, { FC } from "react";
import {
  Div,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Search,
} from "@vkontakte/vkui";
import { DefaultPageProps } from "../../helpers/types";
import { observer } from "mobx-react-lite";
import { Icon28AddOutline } from "@vkontakte/icons";
import { useRenderSearchResult } from "./useRenderSearchResult";

const Commands: FC<DefaultPageProps> = () => {
  const { search, setSearch, onSearchKeyDown, renderSearchResult } =
    useRenderSearchResult();

  return (
    <Panel>
      <PanelHeader
        right={
          <PanelHeaderButton>
            <Icon28AddOutline />
          </PanelHeaderButton>
        }
      >
        Команды
      </PanelHeader>
      <Div>
        <Group>
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            after={null}
            onKeyDown={onSearchKeyDown}
          />
          {renderSearchResult}
        </Group>
      </Div>
    </Panel>
  );
};

export default observer(Commands);
