import { APIButtonComponentWithCustomId } from 'discord-api-types';
import { Command } from '../type/command';

const command: Command = {
    command: 'pls stream',
    cooldown: 45_000,
    actions: [{
        should_reference: false,
        matcher(msg) {
            return !!msg.embeds[0]?.author?.name.includes('Stream Manager');
        },
        async execute(client, message) {
            const button = message.components![0]!.components[0] as APIButtonComponentWithCustomId;
            await client.clickButton(message, button);
        },
        async update(client, message) {
            console.log(message);
        }
    }],
};

export default command;
