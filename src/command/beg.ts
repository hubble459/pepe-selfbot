import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: 'pls beg',
    active: config().Commands.Beg.Enabled,
    cooldown: config().Commands.Beg.Timeout,
    actions: [],
};

export default command;
