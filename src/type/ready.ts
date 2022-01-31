import { Status } from './websocket';
import { APIGuild, Snowflake } from 'discord-api-types';
import { User } from './user';

export type Relationship = {
    user: User;
    type: number; // 1 friend?
    nickname: null | string;
    id: Snowflake;
};

export type ReadState = {
    mention_count: number;
    last_pin_timestamp: string;
    last_message_id: string | 0;
    id: Snowflake;
};

export type PrivateChannel = {
    type: number;
    recipients: any[];
    last_message_id: string;
    id: Snowflake;
};

export default interface Ready {
    v: 9; // version
    user_settings_proto: string;
    user_settings: {
        inline_attachment_media: boolean;
        show_current_game: boolean;
        friend_source_flags: any[];
        view_nsfw_guilds: boolean;
        enable_tts_command: boolean;
        render_reactions: boolean;
        gif_auto_play: boolean;
        stream_notifications_enabled: boolean;
        animate_emoji: boolean;
        afk_timeout: number;
        detect_platform_accounts: boolean;
        status: Status;
        explicit_content_filter: number;
        custom_status: null | string;
        default_guilds_restricted: boolean;
        theme: 'dark' | 'light';
        allow_accessibility_detection: boolean;
        locale: 'en-GB' | string;
        native_phone_integration_enabled: boolean;
        guild_positions: any[];
        timezone_offset: number;
        friend_discovery_flags: number;
        contact_sync_enabled: boolean;
        disable_games_tab: boolean;
        guild_folders: number[];
        inline_embed_media: boolean;
        developer_mode: boolean;
        render_embeds: boolean;
        animate_stickers: number;
        message_display_compact: boolean;
        convert_emoticons: boolean;
        passwordless: boolean;
        restricted_guilds: any[];
    };
    user_guild_settings: [];
    user: User;
    tutorial: null | true;
    session_id: string;
    relationships: Relationship[];
    read_state: ReadState[];
    private_channels: PrivateChannel[];
    presences: any[];
    notes: any;
    guilds: APIGuild[];
    guild_join_requests: any[];
    guild_experiments: [number, null | string, number, any[], any[], any[]][];
    geo_ordered_rtc_regions: string[];
    friend_suggestion_count: number;
    experiments: [number, number, number, number, number][];
    country_code: string; // NL
    consents: {
        personalization: {
            consented: boolean;
        };
    };
    connected_accounts: any[];
    analytics_token: string;
}
