import { Message, Client } from "discord.js";
import { container, TokenProvider } from "tsyringe";
import { Command } from './command';
import { BotService } from "./services";
import { OnReady, onMessage, onCommandUnrecognized, onCommandError } from "./hooks";
import { BotModuleOptions, BotModuleMetakey, BotModuleCommandsMetakey, BotCommandMetaKey, BotCommandOptions } from "./decorators";
import { log, LogLevel } from './loggging';
import { CommandRegistry } from "./commandRegistry";
import { CommandArgBuilder } from "./commandArgBuilder";

export class JyggaBot {

  private commandMap = new Map<string | RegExp, Command>();
  private simpleCommands = new Map<string, Command>();
  private regexCmds: { exp: RegExp, cmd: Command }[] = [];
  private commandList: Command[] = [];

  private client: Client;
  private prefix: string = '!';
  private modules: any[] = [];
  private providers: any[] = [];
  private token: string;

  constructor(opts: {
    modules: any[],
    services: any[],
    prefix?: string,
    token?: string,
    botOwnerId?: string,
  }, private commandRegistry: CommandRegistry = new CommandRegistry()) {
    this.prefix = opts.prefix || '';
    this.client = new Client();
    this.startBotService();
    this.setUpEvents();
    this.boostrapServices(opts.services);
    this.bootstrapModules(opts.modules);
    this.token = opts.token;
  }

  private startBotService() {
    container.register<BotService>(BotService, { useValue: new BotService(this.client) });
  }

  private boostrapServices(svcs: any[]) {
    svcs.forEach((p) => {
      let instance = container.resolve<any>(p);
      container.register(p, { useValue: instance });
    });
  }

  private bootstrapModules(mdls: any[]) {
    mdls.forEach(m => {
      let mdlOpts: BotModuleOptions = Reflect.getMetadata(BotModuleMetakey, m);
      let instance = container.resolve<any>(m);
      this.modules.push(instance);
      let cmdPropKeys: string[] = Reflect.getMetadata(BotModuleCommandsMetakey, instance) || [];
      cmdPropKeys.forEach(prop => {
        let cmdOpts: BotCommandOptions = Reflect.getMetadata(BotCommandMetaKey, instance, prop);

        let params = Reflect.getMetadata('design:paramtypes', instance, prop);
        let commandItem: Command = {
          exec: (instance[prop] as Function).bind(instance),
          scope: {},
          params
        };

        if (mdlOpts.scope) {
          commandItem.scope = {
            userId: mdlOpts.scope.userId,
            guildId: mdlOpts.scope.guildId,
            channelId: mdlOpts.scope.channelId,
            roleId: mdlOpts.scope.roleId
          }
        }
        if (cmdOpts.scope) {
          commandItem.scope = {
            userId: cmdOpts.scope.userId || commandItem.scope.userId,
            guildId: cmdOpts.scope.guildId || commandItem.scope.guildId,
            channelId: cmdOpts.scope.channelId || commandItem.scope.channelId,
            roleId: cmdOpts.scope.roleId || commandItem.scope.roleId
          }
        }
        let trigger = cmdOpts.trigger;
        if ((cmdOpts.trigger as RegExp).test) {
          this.commandRegistry.registerCommand(commandItem, trigger);
          log(`registered: ${cmdOpts.trigger.toString()}`);
        } else {
          let id = `${mdlOpts.prefix || this.prefix}${cmdOpts.trigger}`;
          let prefix = mdlOpts.prefix || this.prefix;
          this.commandRegistry.registerCommand(commandItem, trigger, prefix);
          log(`registered: ${id}`);
        }

        this.commandRegistry.registerCommand(commandItem, trigger);
      });
    });
  }

  private setUpEvents() {
    this.client.once('ready', this.onReady.bind(this));
    this.client.on('message', this.onMessage.bind(this));
  }

  private findMatch(text: string): { cmd: Command, args: string[] } {
    let args = text.split(' ');
    let command = args.shift() as string;
    let mapValue = this.commandMap.get(command);
    if (mapValue) {
      return {
        cmd: mapValue,
        args
      };
    }
    let match = this.regexCmds.find(c => c.exp.test(text));
    if (match) {
      return {
        cmd: match.cmd,
        args
      }
    }
    throw new Error('Command not recognized');
  }

  private async onMessage(message: Message) {
    try {
      if (message.author.id === this.client.user.id) {
        return;
      }

      new Promise((resolve, reject) => {
        this.modules.forEach((m: any) => {
          if ((m as onMessage).botOnMessage) {
            m.botOnMessage(message);
          }
        });
        resolve();
      });

      let match = this.commandRegistry.findMatch(message.content);
      if (match == null) {
        throw new Error('Command not recognized');
      }

      if (match.scope) {
        let cmdScope = match.scope
        if (cmdScope.guildId && cmdScope.guildId != message.guild.id) {
          throw new Error('Invalid guild');
        }
        if (cmdScope.channelId && cmdScope.channelId != message.channel.id) {
          throw new Error('Invalid channel');
        }
        let guildMember = message.guild.member(message.author);
        if (cmdScope.roleId && !guildMember.roles.resolve(cmdScope.roleId)) {
          throw new Error('Invalid role');
        }
        if (cmdScope.userId && cmdScope.userId != message.author.id) {
          throw new Error('Invalid user');
        }
      }

      let argBuilder = new CommandArgBuilder(message, match, match.params);
      let args = argBuilder.getArgs();

      let out = await match.exec(...args);
      if (out) {
        message.channel.send(out);
      }
    } catch (error) {
      if (error.message == 'Command not recognized') {
        this.modules.forEach((m: any) => {
          if ((m as onCommandUnrecognized).botOnCommandUnrecognized) {
            m.botOnCommandUnrecognized(message);
          }
        });
      } else {
        this.modules.forEach((m: any) => {
          if ((m as onCommandError).botOnCommandError) {
            m.botOnCommandError(message, error);
          }
        });
      }
    }
  }

  private async onReady() {
    this.modules.forEach((m: any) => {
      if ((m as OnReady).botOnReady) {
        m.botOnReady();
      }
    });
  }

  public login(token: string = this.token) {
    return this.client.login(token);
  }
}
