import { Message, TextChannel } from "discord.js";
import { Command } from "./command";

export class CommandArgBuilder {
  constructor(
    private message: Message,
    private command: Command,
    private params: any[]) {
  }

  public getArgs(): any[] {
    let args = [];
    for (var i = 0; i < this.params.length; i++) {
      let arg = undefined;
      let paramType = this.params[i].name.toLowerCase();
      if (['string', 'number'].includes(paramType)) {
        /**
         * the message content excluding the trigger would be split by spaces and treated as separate arguments, 
         * then dequeued one by one from left to right.
         */
        arg = this.deQueueMessagePart();
        if (paramType == 'number') {
          arg = parseInt(arg);
        }
      } else {
        switch (paramType) {
          case 'message':
            arg = this.message;
            break;
          case 'user':
            arg = this.message.author;
            break;
          case 'channel':
            arg = this.message.channel;
            break;
          case 'textchannel': 
            arg = this.message.channel as TextChannel
            break;
          case 'guild':
            arg = this.message.guild;
            break;
          default:
            console.log('check for extractor, otherwise just throw an error')
            arg = null;
        }
      }
      args.push(arg);
    }
    return args;
  }
  private messageParts: string[];
  private deQueueMessagePart() {
    if (!this.messageParts) {
      this.messageParts = this.message.content.split(' ');
      this.messageParts.shift();
    }
    return this.messageParts.shift();
  }
}