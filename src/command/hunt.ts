import { APIButtonComponentWithCustomId } from 'discord-api-types';
import { Command } from '../type/command';
import { sleep, config } from '../util';

const command: Command = {
    command: 'pls hunt',
    active: config().Commands.Hunt.Enabled,
    cooldown: config().Commands.Hunt.Timeout,
    actions: [
        {
            should_reference: true,
            matcher(msg) {
                return !!msg.content.startsWith(`Dodge the Fireball`);
            },
            async execute(client, message) {
                const fireballLine = message.content.split('\n')[2];
                const index = fireballLine.indexOf(`<:FireBall:883714770748964864>`);
                await client.clickButton(message, message.components![0].components[index === 0 ? 1 : 0] as any);
            },
        },
    ],

};

export default command;
