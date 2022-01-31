import { APIButtonComponentWithCustomId } from 'discord-api-types';
import { Action } from '../type/command';
import { sleep } from '../util';

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
        async execute(client, message) {
            const lines = message.content.split('\n');
            lines.unshift();
            console.log(lines);

            await sleep(3000);
            const button = (<APIButtonComponentWithCustomId[]>message.components![0].components).find((c) =>
                c.label?.startsWith('')
            )!;
            await client.clickButton(message, button);
        },
    },
    {
        should_reference: true,
        matcher(msg) {
            return msg.content.includes('Emoji Match');
        },
        async execute(client, message) {
            const emoji = message.content.split('\n')[1];
            console.log(emoji);

            await sleep(2000);
            const button = (<APIButtonComponentWithCustomId[]>[
                ...message.components![0].components,
                ...message.components![1].components,
            ]).find((c) => c.label === emoji)!;
            await client.clickButton(message, button);
        },
    },
];
