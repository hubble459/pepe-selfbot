import { APIMessage } from 'discord-api-types';
import DiscordClient from '../discord_client';

export type Action = {
    matcher: (message: APIMessage) => boolean;
    execute: (client: DiscordClient, message: APIMessage) => any;
    update?: (client: DiscordClient, message: APIMessage) => any;
    should_reference: boolean;
};

export type Command = {
    cooldown: number;
    active: boolean;
    command: string;
    actions: Action[];
};
