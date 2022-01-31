
// export enum ChannelType {
//     VOICE_CHANNEL = 2,
//     CHANNEL_GROUP = 4,
//     TEXT_CHANNEL = 0,
// }

// export type Channel = {
//     type: ChannelType;
//     position: number;
//     permission_overwrites: any[];
//     name: string;
//     id: string;
// };

// export type VoiceChannel = Channel & {
//     type: ChannelType.VOICE_CHANNEL;
//     user_limit: number;
//     rtc_region: null;
//     rate_limit_per_user: number;
//     position: number;
//     permission_overwrites: any[];
//     parent_id: string;
//     name: string
// };

// export type TextChannel = {
//     type: number;
//     position: number;
//     permission_overwrites: any[];
//     name: string;
//     id: string;
// };

// export type ChannelGroup = {
//     type: number;
//     position: number;
//     permission_overwrites: any[];
//     name: string;
//     id: string;
// };

// export type Relationship = {
//     user: User;
//     type: number; // 1 friend?
//     nickname: null | string;
//     id: string;
// };

// export type ReadState = {
//     mention_count: number;
//     last_pin_timestamp: string;
//     last_message_id: string | 0;
//     id: string;
// };

// export type PrivateChannel = {
//     type: number;
//     recipients: any[];
//     last_message_id: string;
//     id: string;
// };

// export type GuildMember = {
//     user: User;
//     roles: Role[];
//     nick?: string;
//     mute: boolean;
//     joined_at: string;
//     hoisted_role: string;
//     deaf: boolean;
// };

// export type Emoji = {
//     roles: Role[];
//     required_colons: boolean;
//     name: string;
//     managed: boolean;
//     id: string;
//     available: boolean;
//     animated: boolean;
// };

// export type Role = {
//     unicode_emoji: null;
//     position: number;
//     permissions: string;
//     name: string;
//     mentionable: boolean;
//     managed: boolean;
//     id: string;
//     icon: null | string;
//     hoist: boolean;
//     color: number;
// };

// export type GuildPresence = Omit<PresenceUpdate, 'guild_id'>;

// export type GuildHash = {
//     version: number;
//     roles: {
//         omitted: boolean;
//         hash: string;
//     };
//     metadata: {
//         omitted: boolean;
//         hash: string;
//     };
//     channels: {
//         omitted: boolean;
//         hash: string;
//     };
// };

// export type Guild = {
//     roles: Role[];
//     emojis: Emoji[];
//     name: string;
//     afk_channel_id: null | string;
//     premium_progress_bar_enabled: boolean;
//     description: null | string;
//     region: 'deprecated' | string;
//     banner: null | string;
//     premium_subscription_count: number;
//     members: GuildMember[];
//     nsfw: boolean;
//     lazy: boolean;
//     voice_states: [];
//     max_video_channel_users: number;
//     guild_hashes: any;
//     guild_scheduled_events: [];
//     stickers: [];
//     premium_tier: number;
//     afk_timeout: number;
//     joined_at: string;
//     preferred_locale: string;
//     explicit_content_filter: number;
//     discovery_splash: null;
//     system_channel_id: string;
//     mfa_level: number;
//     large: boolean;
//     member_count: number;
//     icon: string;
//     max_members: number;
//     verification_level: number;
//     channels: Channel[];
//     nsfw_level: number;
//     threadS: [];
//     stage_instances: [];
//     rules_channel_id: null | string;
//     presences: GuildPresence[];
//     system_channel_flags: number;
//     id: string;
//     application_id: null | string;
//     vanity_url_code: null | string;
//     embedded_activities: [];
//     features: [];
//     splash: null | string;
//     owner_id: string;
//     default_message_notifications: number;
//     hub_typ: null;
//     public_updates_channel_id: null | string;
//     application_command_count: number;
//     application_command_counts: {
//         [id: string]: number;
//     };
// };
