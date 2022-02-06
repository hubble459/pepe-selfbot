import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: 'pls fish',
    active: config().Commands.Fish.Enabled,
    cooldown: config().Commands.Fish.Timeout,
    actions: [
        {
            should_reference: true,
            matcher(msg) {
                return !!msg.content.startsWith(`Catch the fish!`);
            },
            async execute(client, message) {
                const krakenLine = message.content.split('\n')[1];
                const index = krakenLine.startsWith(`              `) ? 2 : krakenLine.startsWith(`       `) ? 1 : 0;
                await client.clickButton(message, message.components![0].components[index] as any);
            },
        },
    ],
};

export default command;
