import { Message as discordMessage} from 'discord.js';
import { injectable, autoInjectable } from 'tsyringe';

@autoInjectable()
class Message extends discordMessage {

}