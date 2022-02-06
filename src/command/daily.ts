import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: 'pls daily',
    active: config().Commands.Daily.Enabled,
    cooldown: config().Commands.Daily.Timeout,
    actions: [],
};

export default command;
