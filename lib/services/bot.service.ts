import { Client, TextChannel, ClientEvents } from 'discord.js';
import { Service } from '../decorators';

@Service()
export class BotService {
  constructor(private _client: Client) {

  }

  public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void) {
    return this._client.on(event, listener);
  }

  public get client() {
    return this._client;
  }

  public get channels() {
    return this.client.channels;
  }

  public get guilds() {
    return this.client.guilds;
  }

  public get users() {
    return this.client.users;
  }

  public get user() {
    return this.client.user;
  }

  public async getChannel(id: string) {
    return (await this.client.channels.fetch(id) as TextChannel);
  }

  public async getUser(guildId: string, userId: string) {
    return this.client.guilds.resolve(guildId).members.fetch(userId);
  }
}