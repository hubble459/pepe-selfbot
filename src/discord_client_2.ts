import WebSocket from 'ws';
import EventEmitter from 'events';
import { rest, Rest } from './util/rest_api';
import { OP_CODE, WSEvents, WSMessage } from './type/websocket';
import { APIButtonComponentWithCustomId, APIGuild, APIMessage, APIMessageSelectMenuInteractionData, APISelectMenuComponent, APISelectMenuOption, Snowflake } from 'discord-api-types';

import { Client, WebSocketManager, WebSocketShard, Constants} from 'discord.js';

// @ts-ignore
WebSocketManager.prototype.connect = async function () {
    const invalidToken = new Error(Constants.WSCodes[4004]);
    const {
      url: gatewayURL,
      shards: recommendedShards,
      session_start_limit: sessionStartLimit,
    } = await this.client.api.gateway.get().catch((error: any) => {
      throw error.httpStatus === 401 ? invalidToken : error;
    });

    const { total, remaining } = sessionStartLimit;

    this.debug(`Fetched Gateway Information
    URL: ${gatewayURL}
    Recommended Shards: ${recommendedShards}`);

    this.debug(`Session Limit Information
    Total: ${total}
    Remaining: ${remaining}`);

    this.gateway = `${gatewayURL}/`;

    let { shards } = this.client.options;

    if (shards === 'auto') {
      this.debug(`Using the recommended shard count provided by Discord: ${recommendedShards}`);
      this.totalShards = this.client.options.shardCount = recommendedShards;
      shards = this.client.options.shards = Array.from({ length: recommendedShards }, (_, i) => i);
    }

    this.totalShards = shards.length;
    this.debug(`Spawning shards: ${shards.join(', ')}`);

    // @ts-ignore
    this.shardQueue = new Set(shards.map(id => new WebSocketShard(this, id)));

    return this.createShards();
}

export default class DiscordClient extends EventEmitter {
    private readonly token: string;
    private ws!: WebSocket;
    public guilds: Map<Snowflake, APIGuild> = new Map();
    public session_id: string = '';
    public application_id: string = '';

    private sequence: number = 0;
    public get apiV9(): Rest {
        return rest('https://discord.com/api/v9', { headers: { authorization: this.token } });
    }

    public override once<T extends keyof WSEvents>(eventName: T, listener: (...args: WSEvents[T]) => any): this {
        return super.once(eventName, listener as any);
    }

    public override on<T extends keyof WSEvents>(eventName: T, listener: (...args: WSEvents[T]) => any): this {
        return super.on(eventName, listener as any);
    }

    public override off<T extends keyof WSEvents>(eventName: T, listener: (...args: WSEvents[T]) => any): this {
        return super.off(eventName, listener as any);
    }

    public override removeAllListeners(eventName: keyof WSEvents): this {
        return super.removeAllListeners(eventName);
    }

    public override removeListener<T extends keyof WSEvents>(
        eventName: T,
        listener: (...args: WSEvents[T]) => any
    ): this {
        return super.removeListener(eventName, listener as any);
    }

    public override addListener<T extends keyof WSEvents>(eventName: T, listener: (...args: WSEvents[T]) => any): this {
        return super.addListener(eventName, listener as any);
    }

    constructor(token: string) {
        super();
        this.token = token;
        this.connect();  
    }

    connect() {
       const client = new Client({intents: ['GUILD_MESSAGES']});
       client.login();
    }

    public sendRaw(op: OP_CODE, data: any) {
        this.ws.send(JSON.stringify({ op, d: data }));
    }

    async send(channelId: Snowflake, command: string) {
        return this.apiV9.channels(channelId).messages._post({ content: command, tts: false }) as Promise<APIMessage>;
    }

    public async clickButton(message: APIMessage, button: APIButtonComponentWithCustomId) {
        if (button.disabled) {
            return;
        }
        try {
            await this.apiV9.interactions._post({
                type: 3,
                guild_id: message.guild_id,
                channel_id: message.channel_id,
                message_id: message.id,
                message_flags: 0,
                application_id: message.author.id,
                session_id: this.session_id,
                data: {
                    component_type: button.type,
                    custom_id: button.custom_id,
                },
            });
        } catch (e) {
            console.error(e, e.errors, message.id);
        }
    }

    public async selectMenuOption(message: APIMessage, selectMenu: APISelectMenuComponent, option: APISelectMenuOption) {
        try {
            await this.apiV9.interactions._post({
                type: 3,
                guild_id: message.guild_id,
                channel_id: message.channel_id,
                message_id: message.id,
                message_flags: 0,
                application_id: message.author.id,
                session_id: this.session_id,
                data: {
                    component_type: selectMenu.type,
                    custom_id: selectMenu.custom_id,
                    type: selectMenu.type,
                    values: [option.value],
                },
            });
        } catch (e) {
            console.error(e, e.errors, message.id);
        }
    }
}
