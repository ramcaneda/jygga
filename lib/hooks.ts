import { 
  Channel, 
  ClientUserGuildSettings, 
  ClientUserSettings, 
  Collection,
  Emoji, 
  Guild,
  GuildMember, 
  Message,  
  MessageReaction, 
  Role, 
  Snowflake, 
  TextChannel,
  User 
} from "discord.js";

export interface onChannelCreate {
  botOnChannelCreate(channel: Channel): void
}

export interface onChannelDelete {
  botOnChannelDelete(channel: Channel): void
}

export interface onChannelPinsUpdate {
  botOnChannelPinsUpdate(channel: Channel, time: Date): void
}

export interface onChannelUpdate {
  botOnchannelUpdate(oldChannel: Channel, newChannel: Channel): void
}

export interface onClientUserGuildSettingsUpdate {
  botOnClientUserGuildSettingsUpdate(clientUserGuildSettings: ClientUserGuildSettings): void
}

export interface onClientUserSettingsUpdate {
  botOnClientUserSettingsUpdate(clientUserSettings: ClientUserSettings): void
}

export interface onDebug {
  botOnDebug(info: string): void;
}

export interface onDisconnect {
  botOnDisconnec(event: CloseEvent): void
}

export interface onEmojiCreate {
  botOnEmojiCreate(emoji: Emoji): void
}

export interface onEmojiDelete {
  botOnEmojiDelete(emoji: Emoji): void
}

export interface onEmojiUpdate {
  botOnEmojiUpdate(oldEmoji: Emoji, newEmoji: Emoji): void
}

export interface onError {
  botOnError(error: Error): void
}

export interface onGuildBanAdd {
  botOnGuildBanAdd(guild: Guild, user: User): void
}

export interface onGuildBanRemove {
  botOnGuildBanRemove(guild: Guild, user: User): void
}

export interface onGuildCreate {
  botOnGuildCreate(guild: Guild): void
}

export interface onGuildDelete {
  botOnGuildDelete(guild: Guild): void
}

export interface onGuildIntegrationsUpdate {
  botOnGuildIntegrationsUpdate(guild: Guild): void
}

export interface onGuildMemberAdd {
  botOnGuildMemberAdd(member: GuildMember): void
}

export interface onGuildMemberAvailable {
  botOnGuildMemberAvailable(member: GuildMember): void
}

export interface onGuildMemberRemove {
  botOnGuildMemberRemove(member: GuildMember): void
}

export interface onGuildMembersChunk {
  botOnGuildMembersChunk(members: Array<GuildMember>, guild: Guild): void
}

export interface onGuildMemberSpeaking {
  botOnGuildMemberSpeaking(member: GuildMember, speaking: boolean): void
}

export interface onGuildMemberUpdate {
  botOnGuildMemberUpdate(oldMember: GuildMember, newMember: GuildMember): void
}

export interface onGuildUnavailable {
  botOnGuildUnavailable(guild: Guild): void
}

export interface onGuildUpdate {
  botOnGuildUpdate(oldGuild: Guild, newGuild: Guild): void
}

export interface onMessage {
  botOnMessage(message: Message): void
}

export interface onMessageDelete {
  botOnMessageDelete(message: Message): void
}

export interface onMessageDeleteBulk {
  botOnMessageDeleteBulk(messages: Collection<Snowflake, Message>): void
}

export interface onMessageReactionAdd {
  botOnMessageReactionAdd(messageReaction: MessageReaction, user: User): void
}

export interface onMessageReactionRemove {
  botOnMessageReactionRemove(messageReaction: MessageReaction, user: User): void
}

export interface onMessageReactionRemoveAll {
  botOnMessageReactionRemoveAll(message: Message): void
}

export interface onMessageUpdate {
  botOnMessageUpdate(oldMessage: Message, newMessage: Message): void
}

export interface onPresenceUpdate {
  botOnPresenceUpdate(oldMember: GuildMember, newMember: GuildMember): void
}

export interface onRateLimit {
  botOnRateLimit(rateLImitInfo: {
    limit: number,
    timeDifference: number,
    path: string,
    method: string
  }): void
}

export interface OnReady {
  botOnReady(): void
}

export interface onReconnecting {
  botOnReconnecting(): void
}

export interface onResume {
  botOnResume(replayed: number): void
}

export interface onRoleCreate {
  botOnRoleCreate(role: Role): void
}

export interface onRoleDelete {
  botOnRoleDelete(role: Role): void
}

export interface inRoleUpdate {
  botOnRoleUpdate(oldRole: Role, newRole: Role): void
}

export interface onTypingStart {
  botOnTypingStart(channel: Channel, user: User): void
}

export interface onTypingStop {
  botOnTypingStop(channel: Channel, user: User): void
}

export interface onUserNoteUpdate {
  botOnUserNoteUpdate(user: User, oldNote: string, newNote: string): void
}

export interface onUserUpdate{
  botOnUserUpdate(oldUser: User, newUser: User): void
}

export interface onVoiceStateUpdate{
  botOnVoiceStateUpdate(oldMember: GuildMember, newMember: GuildMember): void
}

export interface onWarn{
  botOnWarn(info: string): void
}

export interface onWebHookUpdate{
  botOnWebHookUpdate(channel: TextChannel): void
}