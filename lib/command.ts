import { Message } from "discord.js";
import { Scope } from "./decorators";

export interface Command {
  scope?: Scope,
  exec: CommandExec,
  params?: any[],
  description?: string,
  example?: { in: string, out: string }
}

export type CommandExec = (...args: any[]) => Promise<string | void> | string | void;

export enum role {
  guest,
  member,
  guildadmin,
  guildowner,
  botadmin,
  botowner
}