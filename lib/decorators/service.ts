import { Scope } from "./scope";
import { injectable, container, autoInjectable } from "tsyringe";

export const BotServiceMetaKey = Symbol('BSvcMeta');

export function Service<T>(){
  return (target: any) => {
    return injectable()(target);
  }
}