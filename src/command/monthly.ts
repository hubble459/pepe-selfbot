import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: 'pls monthly',
    active: config().Commands.Monthly.Enabled,
    cooldown: config().Commands.Monthly.Timeout,
    actions: [],
};

export default command;
