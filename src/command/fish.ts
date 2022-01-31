import { Command } from '../type/command';

const command: Command = {
    command: 'pls fish',
    cooldown: 40000,
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
