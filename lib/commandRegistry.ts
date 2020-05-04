import { Command } from "./command";
export class CommandRegistry {

  private regExRegistry: { regExp: RegExp, command: Command }[] = [];

  public registerCommand(command: Command, trigger: string | RegExp, prefix?: string)  {
    let regExp = trigger as RegExp;
    if (!(trigger as RegExp).test) {
      regExp = new RegExp(`^${prefix}${trigger.toString()}\\b`);
    }
    this.regExRegistry.push({
      regExp,
      command
    });
    return regExp.toString();
  }

  public findMatch(msg: string): Command {
    let match = this.regExRegistry.find((cand => cand.regExp.test(msg)));
    if (!match) {
      return null;
    }
    return match.command;
  }
}