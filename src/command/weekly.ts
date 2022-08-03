import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: 'pls weekly',
    active: config().Commands.Weekly.Enabled,
    cooldown: config().Commands.Weekly.Timeout,
    actions: [],
};

export default command;
