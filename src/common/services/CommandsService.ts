import { makeAutoObservable } from "mobx";
import _commandsJson from "../../assets/json/commandsAmadeus.json";
import { Command } from "../helpers/commands/types";

const commandsJson = _commandsJson as any;

class CommandsService {
  constructor() {
    makeAutoObservable(this);
  }

  getCommandById(id: string | number): Command {
    return commandsJson[id];
  }

  get commands(): Command[] {
    return Object.keys(commandsJson).map((key) => commandsJson[key]);
  }
}

const commandsService = new CommandsService();

export default commandsService;
