import { APIButtonComponent } from 'discord-api-types';
import { minigames } from '../command_actions/minigames';
import { Command } from '../type/command';
import { sleep } from '../util';

const command: Command = {
    command: 'pls work',
    cooldown: 36000000,
    actions: minigames,
};

export default command;
