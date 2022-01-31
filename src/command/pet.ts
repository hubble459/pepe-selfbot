import { APIButtonComponentWithCustomId } from 'discord-api-types';
import { minigames } from '../command_actions/minigames';
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
        ...minigames
    ],
};

export default command;
