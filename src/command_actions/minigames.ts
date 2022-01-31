import { APIButtonComponentWithCustomId } from 'discord-api-types';
import { Action } from '../type/command';
import { sleep } from '../util';

let emoji: string | undefined;
let lines: string[] | undefined;

export const minigames: Action[] = [
    {
        should_reference: true,
        matcher(msg) {
            return !!msg.embeds[0]?.footer?.text.startsWith(`Soccer`);
        },
        async execute(client, message) {
            const personLine = message.content.split('\n')[2];
            const index = personLine.indexOf(`:levitate:`);
            await client.clickButton(message, message.components![0].components[index === 0 ? 1 : 0] as any);
        },
    },
    {
        should_reference: true,
        matcher(msg) {
            return msg.content.includes('Color Match');
        },
        async execute(_client, message) {
            lines = message.content.split('\n');
            lines.unshift();
            console.log(lines);
        },
        async update(client, message) {
            if (!!lines) {
                const word = ''; // ?
                const button = (<APIButtonComponentWithCustomId[]>message.components![0].components).find((c) =>
                    c.label?.startsWith('')
                )!;
                lines = undefined;
                await client.clickButton(message, button);
            }
        },
    },
    {
        should_reference: true,
        matcher(msg) {
            return msg.content.includes('Emoji Match');
        },
        async execute(_client, message) {
            emoji = message.content.split('\n')[1];
        },
        async update(client, message) {
            if (!!emoji) {
                const button = (<APIButtonComponentWithCustomId[]>[
                    ...message.components![0].components,
                    ...message.components![1].components,
                ]).find((c) => c.label === emoji)!;
                emoji = undefined;
                await client.clickButton(message, button);
            }
        },
    },
];
