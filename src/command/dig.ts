import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: 'pls dig',
    active: config().Commands.Dig.Enabled,
    cooldown: config().Commands.Dig.Timeout,
    actions: [],
};

export default command;
