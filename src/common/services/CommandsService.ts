import { makeAutoObservable } from "mobx";
import { Command } from "../helpers/commands/types";
import { orderBy } from "lodash";
import CommandHelper from "../helpers/commands/CommandHelper";

interface CommandAllVariantsNames {
  id: number;
  names: string[];
}

class CommandsService {
  commandsJson: Record<string, Command> = {};

  constructor() {
    makeAutoObservable(this);
  }

  // возвращает все команды и их модификаторы
  get commands(): Command[] {
    const commands = Object.keys(this.commandsJson).map(
      (key) => this.commandsJson[key]
    );
    return this.orderBy(commands);
  }

  // возвращает только основные команды (без их модификаторов)
  get commandsOriginal(): Command[] {
    const commands = Object.keys(this.commandsJson)
      .filter((key) => Number(key) > 0)
      .map((key) => this.commandsJson[key]);
    return this.orderBy(commands);
  }

  // возвращает только модификаторы команд
  get commandsModifiers(): Command[] {
    const commands = Object.keys(this.commandsJson)
      .filter((key) => Number(key) < 0)
      .map((key) => this.commandsJson[key]);
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

  async init() {
    this.commandsJson = await (
      await fetch("/commands.json", { method: "GET" })
    ).json();
  }

  getCommandById(id: string | number): Command {
    return this.commandsJson[id];
  }

  // сортировка команд по полному названию
  orderBy(commands: Command[]) {
    return orderBy(
      commands,
      [(x) => CommandHelper.getCommandFullName(x.id)],
      "asc"
    );
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
}

const commandsService = new CommandsService();

export default commandsService;
