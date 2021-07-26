import { makeAutoObservable } from "mobx";

class CommandsStore {
  constructor() {
    makeAutoObservable(this);
  }

  search = "";

  setSearch = (search: string) => {
    this.search = search;
  };
}

export const commandsStore = new CommandsStore();
