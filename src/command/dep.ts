import { Command } from '../type/command';
import { config } from '../util';

const command: Command = {
    command: 'pls dep all',
    active: config().Commands.Dep.Enabled,
    cooldown: config().Commands.Dep.Timeout,
    actions: [],
};

export default command;
