import { APIMessage } from 'discord-api-types';
import Ready from './ready';

export enum OP_CODE {
    HEARTBEAT = 1,
    IDENTIFY = 2,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
}

export type WSMessage = {
    t: keyof WSEvents;
    s: number;
    op: OP_CODE;
    d: any;
};

export type Status = 'online' | 'dnd' | 'offline' | 'idle';

export type Activity = {
    type: number; // type?
    timestamps: {
        start: number; // epoch
    };
    state: string;
    name: string;
    id: string;
    details: string;
    created_at: number; // epoch
    assets: {
        large_image: string;
    };
    application_id: string;
}

export type PresenceUpdate = {
    user: {
        id: string;
    };
    status: Status;
    guild_id: string;
    client_status: {
        desktop?: Status;
        mobile?: Status;
    };
    activities: Activity[];
}


export type SessionReplace = {
    status: Status;
    session_id: string;
    client_info: {
        version: 0;
        os: string;
        client: any;
    };
    activities: any[];
};

export interface WSEvents {
    READY: [Ready];
    PRESENCE_UPDATE: [PresenceUpdate];
    SESSION_REPLACE: [SessionReplace];
    MESSAGE_CREATE: [APIMessage];
    '*': [{type: keyof WSEvents, data: any}];
}
