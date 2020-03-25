import { Scope } from './scope';

export const BotCommandMetaKey = Symbol('BCmdMeta');
export const BotModuleCommandsMetakey = Symbol('BMdlCmds');

export function BotCommand(options: BotCommandOptions | string | RegExp){
  return function (target: any, propertyKey: string){
    if(!Reflect.hasMetadata(BotModuleCommandsMetakey, target)){
      Reflect.defineMetadata(BotModuleCommandsMetakey, [], target);
    }
    let commands = Reflect.getMetadata(BotModuleCommandsMetakey, target);
    commands.push(propertyKey);
    let opts = options as BotCommandOptions;
    if(typeof options == 'string'){
      opts = {
        trigger: options
      }
    }else if((options as RegExp).test){
      opts = {
        trigger: options as RegExp
      }
    }
    Reflect.defineMetadata(BotCommandMetaKey, opts, target, propertyKey);
  }
}

export interface BotCommandOptions {
  trigger: string | RegExp,
  scope?: Scope
}
