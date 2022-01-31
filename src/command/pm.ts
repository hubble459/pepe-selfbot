import { Command } from '../type/command';

const command: Command = {
    command: 'pls pm',
    cooldown: 45_000,
    actions: [{
        should_reference: true,
        matcher(message) {
            return !!message.embeds[0]?.author?.name.includes('meme posting');
        },
        async execute(client, message) {
            const buttons = message.components![0].components!;
            await client.clickButton(message, buttons[Math.floor(Math.random() * buttons.length)] as any);
        }
    }],
};

export default command;
