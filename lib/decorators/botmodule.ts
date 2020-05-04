import { Scope } from "./scope";
import { injectable } from "tsyringe";

export const BotModuleMetakey = Symbol('BMdlMeta');

export function BotModule<T>(options: BotModuleOptions = {
  prefix: ''
}){
  return (target: any) => {
    Reflect.defineMetadata(BotModuleMetakey, options, target);
    return injectable<T>()(target);
  }
}

export interface BotModuleOptions{
  prefix?: string,
  scope?: Scope
}