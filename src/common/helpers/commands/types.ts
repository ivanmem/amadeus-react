export interface Command {
  id: number;
  idOriginal: number | null;
  alias: string[];
  accessLevel: number;
  help: string;
  helpExtended: string;
  commandImplicit: CommandImplicit[];
  gameMode: boolean;
  ignoreFilter: boolean;
  privateMessages: number;
  onlyPrivateMessages: boolean;
  notPrivateMessages: boolean;
  hide: boolean;
  isOnlyBotCreator: boolean;
  privateMessagesNotPeerId: boolean;
  strictAliasMode: boolean;
  donLevelRequired: number;
  repeat: number;
  timeLimit: string;
  timeLimitConversation: string;
  type: number;
  arguments: Argument[];
  modifiers?: number[];
}

export interface CommandImplicit {
  alias: string[];
  help: string;
  helpExtended: string;
  arguments: Argument[];
}

export interface Argument {
  type: number;
  description: null | string;
  indexNotImportant: boolean;
  typeString: TypeString;
  required: boolean;
  isHideType: boolean;
  isCheckRequired: boolean;
  newLine: boolean;
  help: string;
}

export enum TypeString {
  Date = "date",
  Message = "message",
  Number = "number",
  Penality = "penality",
  Period = "period",
  PurpleNumber = "number[]",
  String = "string",
  TypeStringNumber = "number[-]",
  TypeStringString = "string*",
  User = "user",
}
