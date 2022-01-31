import { Command } from '../type/command';

let canBuy = false;

const command: Command = {
    command: 'pls pm',
    cooldown: 45_000,
    actions: [
        {
            should_reference: true,
            matcher(message) {
                return !!message.embeds[0]?.author?.name.includes('meme posting');
            },
            async execute(client, message) {
                const buttons = message.components![0].components!;
                await client.clickButton(message, buttons[Math.floor(Math.random() * buttons.length)] as any);
                canBuy = true;
            },
            async update(client, message) {
                if (!canBuy) {
                    return;
                }
                if (message.embeds[0].description?.includes('**Laptop** is broken')) {
                    canBuy = false;
                    await client.send(message.channel_id, 'pls buy laptop');
                }
            },
        },
    ],
};

export default command;
