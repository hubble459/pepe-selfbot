import { APIButtonComponent } from 'discord-api-types';
import { minigames } from '../command_actions/minigames';
import { Command } from '../type/command';
import { sleep, config } from '../util';

const command: Command = {
    command: 'pls work',
    active: config().Commands.Work.Enabled,
    cooldown: config().Commands.Work.Timeout,
    actions: minigames,
};

export default command;
