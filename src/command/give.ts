import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: `pls give all <@${config().BankUserID}>`,
    active: config().General.HasBank,
    cooldown: config().Commands.Give.Timeout,
    actions: [
        {
            should_reference: true,
            matcher(msg) {
                return !!msg.embeds[0]?.description?.includes('Are you sure you want to give');
            },
            async execute(client, message) {
                await client.clickButton(message, message.components![0].components[1] as any);
            },
        },
    ],
};

export default command;
