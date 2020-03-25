import { injectable } from 'tsyringe';
import { Client, TextChannel } from 'discord.js';

@injectable()
export class BotService {
  constructor(private _client: Client){

  }

  public get client(){
    return this._client;
  }

  public get channels(){
    return this.client.channels;
  }

  public get guilds(){
    return this.client.guilds;
  }

  public get users(){
    return this.client.users;
  }

  public get user(){
    return this.client.user;
  }

  public getChannel(id: string){
    return (this.client.channels.get(id) as TextChannel);
  }

  public getUser(guildId: string, userId: string){
    return this.client.guilds.get(guildId).members.get(userId);
  }
}