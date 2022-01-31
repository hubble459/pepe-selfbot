import { APIButtonComponentWithCustomId } from 'discord-api-types';
import { Command } from '../type/command';
import { sleep } from '../util';

const command: Command = {
    command: 'pls pet',
    cooldown: 60000 * 15,
    actions: [
        {
            should_reference: false,
            matcher(msg) {
                return !!msg.embeds[0]?.footer?.text.startsWith(`Tip: You can't increase a stat`);
            },
            async execute(client, message) {
                const buttons = (<APIButtonComponentWithCustomId[]>message.components![0].components).slice(0, -2).filter(b => !b.disabled);
                for (const button of buttons) {
                    await client.clickButton(message, button);
                    sleep(200);
                }
                const end = message.components![1].components.at(-1);
                await client.clickButton(message, end as any);
            },
        },
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
    ],

};

export default command;
