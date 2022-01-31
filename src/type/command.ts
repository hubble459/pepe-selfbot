import { APIMessage } from 'discord-api-types';
import DiscordClient from '../discord_client';

export type Command = {
    cooldown: number;
    command: string;
    actions: {
        matcher: (message: APIMessage) => boolean;
        execute: (client: DiscordClient, message: APIMessage) => any;
        update?: (client: DiscordClient, message: APIMessage) => any;
        should_reference: boolean;
    }[];
};
