import commandsService from "../../services/CommandsService";
import { PermissionPrivateMessagesTypeEnum, TypeCommandEnum } from "./types";

const TYPES_COMMAND = {
  [TypeCommandEnum.Unselected]: "Неизвестный тип",
  [TypeCommandEnum.Service]: "Сервисные",
  [TypeCommandEnum.Settings]: "Конфигурационные",
  [TypeCommandEnum.Information]: "Информационные",
  [TypeCommandEnum.Gaming]: "Игровые",
  [TypeCommandEnum.ActionsUsers]: "Манипулирующие пользователями",
};

class CommandHelper {
  static getSmileNumber(number: number): string {
    return number?.toString() || "";
  }

  static getLevelText(accessLevel: number = 0) {
    return `${this.getNameLevel(accessLevel)} (${this.getSmileNumber(
      accessLevel
    )} лвл)`;
  }

  static getNameLevel(accessLevel: number) {
    switch (accessLevel) {
      case 11:
        return "Создатель";
      case 10:
        return "Помощник создателя";
      case 9:
        return "Старший администратор";
      case 8:
        return "Администратор";
      case 7:
        return "Помощник администратора";
      case 6:
        return "Старший модератор";
      case 5:
        return "Модератор";
      case 4:
        return "Помощник модератора";
      case 3:
        return "Старший участник";
      case 2:
        return "Участник";
      case 1:
        return "Младший участник";
      case 0:
        return "Прохожий";
      default:
        return "Бесправный";
    }
  }

  static getCommandFullName(id: number | string) {
    const command = commandsService.getCommandById(id);
    if (!command) {
      return "Неизвестная команда";
    }

    if (!command.idOriginal) {
      return command.alias[0];
    }

    const commandOriginal = commandsService.getCommandById(command.idOriginal);

    return `${commandOriginal.alias[0]} ${command.alias[0]}`;
  }

  static getType(type = TypeCommandEnum.Unselected) {
    return TYPES_COMMAND[type];
  }

  // Разрешена ли команда в личных сообщениях
  static isAccessLs(
    privateMessages: PermissionPrivateMessagesTypeEnum = PermissionPrivateMessagesTypeEnum.No
  ) {
    return (
      privateMessages !== PermissionPrivateMessagesTypeEnum.No &&
      privateMessages !== PermissionPrivateMessagesTypeEnum.None
    );
  }
}

export default CommandHelper;
