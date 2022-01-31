import WebSocket from 'ws';
import EventEmitter from 'events';
import { rest, Rest } from './util/rest_api';
import { OP_CODE, WSEvents, WSMessage } from './type/websocket';
import os from 'os';
import Ready from './type/ready';
import { APIButtonComponentWithCustomId, APIGuild, APIMessage, APIMessageSelectMenuInteractionData, APISelectMenuComponent, APISelectMenuOption, Snowflake } from 'discord-api-types';

export default class DiscordClient extends EventEmitter {
    private readonly token: string;
    private ws: WebSocket;
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
        this.ws = new WebSocket('wss://gateway.discord.gg/?encoding=json&v=9');
        this.ws.on('open', () => {
            console.log('Connected!');
        });
        this.ws.on('close', () => {
            this.ws = new WebSocket('wss://gateway.discord.gg/?encoding=json&v=9');
        });
        this.ws.on('message', (data: Buffer) => {
            const message: WSMessage = JSON.parse(data.toString('utf-8'));

            if (message.s) this.sequence = message.s;

            if (message.t === 'READY') {
                this.session_id = (message.d as Ready).session_id;
                (message.d as Ready).guilds.forEach((g) => this.guilds.set(g.id, g));
            }
            this.emit(message.t, message.d);
            this.emit('*', { type: message.t, data: message.d });

            switch (message.op) {
                case OP_CODE.HELLO:
                    // heartbeat
                    this.sendRaw(OP_CODE.IDENTIFY, {
                        token,
                        properties: {
                            os: os.type(),
                            browser: 'node.js',
                            browser_version: '97.0.4692.99',
                            device: os.type(),
                        },
                        compress: false,
                    });
                    setInterval(() => this.sendRaw(OP_CODE.HEARTBEAT, this.sequence), message.d.heartbeat_interval);
                    break;
                default:
                    break;
            }
        });
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
