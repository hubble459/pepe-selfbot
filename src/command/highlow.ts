import { Command } from '../type/command';

const command: Command = {
    command: 'pls hl',
    cooldown: 30000,
    actions: [
        {
            should_reference: true,
            matcher(msg) {
                return !!msg.embeds[0]?.description?.includes('I just chose a secret number');
            },
            async execute(client, message) {
                const number = +message.embeds[0].description!.match(/\*\*(\d+)\*\*/)![1]!;
                if (number < 50) {
                    await client.clickButton(message, message.components![0].components[2] as any);
                } else {
                    await client.clickButton(message, message.components![0].components[0] as any);
                }
            },
        },
    ],
};

export default command;
