import { makeAutoObservable } from "mobx";
import _commandsJson from "../../assets/json/commandsAmadeus.json";
import { Command } from "../helpers/commands/types";
import { orderBy } from "lodash";
const commandsJson = _commandsJson as any;

interface CommandAllVariantsNames {
  id: number;
  names: string[];
}

class CommandsService {
  constructor() {
    makeAutoObservable(this);
  }

  getCommandById(id: string | number): Command {
    return commandsJson[id];
  }

  // сортировка команд по первому алиасу
  orderBy(commands: Command[]) {
    return orderBy(commands, (x) => x.alias[0], ["asc"]);
  }

  searchCommand(_search: string): Command[] {
    const search = _search.trim().toLowerCase();
    if (search.length === 0) {
      return [];
    }

    return (
      commandsService.commandsAllVariantsNames.filter((x) =>
        x.names.find((name) => name.includes(search))
      ) || []
    ).map((x) => commandsService.getCommandById(x.id));
  }

  searchDescription(_search: string): Command[] {
    const search = _search.trim().toLowerCase();
    if (search.length === 0) {
      return [];
    }

    return commandsService.commands.filter((x) =>
      x.helpExtended.toLowerCase().includes(search)
    );
  }

  // возвращает все команды и их модификаторы
  get commands(): Command[] {
    const commands = Object.keys(commandsJson).map((key) => commandsJson[key]);
    return this.orderBy(commands);
  }

  // возвращает только основные команды (без их модификаторов)
  get commandsOriginal(): Command[] {
    const commands = Object.keys(commandsJson)
      .filter((key) => Number(key) > 0)
      .map((key) => commandsJson[key]);
    return this.orderBy(commands);
  }

  // возвращает только модификаторы команд
  get commandsModifiers(): Command[] {
    const commands = Object.keys(commandsJson)
      .filter((key) => Number(key) < 0)
      .map((key) => commandsJson[key]);
    return this.orderBy(commands);
  }

  get commandsAllVariantsNames(): CommandAllVariantsNames[] {
    const commandsOriginal: CommandAllVariantsNames[] =
      this.commandsOriginal.map((command) => ({
        id: command.id,
        names: command.alias,
      }));

    const commandsModifiers: CommandAllVariantsNames[] =
      this.commandsModifiers.map((command) => {
        const commandOriginal = this.getCommandById(command.idOriginal!);
        return {
          id: command.id,
          names: commandOriginal.alias
            .map((aliasOriginal) => [
              ...command.alias.map((alias) => `${aliasOriginal} ${alias}`),
            ])
            .flat(),
        };
      });

    return [...commandsOriginal, ...commandsModifiers];
  }
}

const commandsService = new CommandsService();

export default commandsService;
