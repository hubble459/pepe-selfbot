import DiscordClient from './discord_client';
import glob from 'glob';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import YAML from 'yaml';
import axios from 'axios';
import chalk from 'chalk';
import { Command } from './type/command';
import { Snowflake } from 'discord-api-types';
import { sleep, devconfig, config } from './util';
dotenv.config();

const CONFIG_FILEPATH = path.join(__dirname, '../config.yml');

if (!fs.existsSync(CONFIG_FILEPATH)) {
    const error = chalk.bold.red.underline;
    console.log(
        `${error('[!] Could not find the configuration file!')}\n${chalk.yellow('regenerating config.yml...')}`
    );
    fs.writeFileSync(CONFIG_FILEPATH, devconfig);
}

const PEPE_BOT = '270904126974590976';
const DISCORD_ID = config().SelfBotUserID;
const TOKEN = process.env.TOKEN;
const TS_MODE = process.env.TS_NODE_DEV === 'true';
let channelId: undefined | Snowflake;

// apiChecks();

if (!TOKEN) {
    console.error('Missing TOKEN in environment variables');
    process.exit(-1);
}

if (!DISCORD_ID) {
    console.error('Missing SelfBotUserID in environment variables');
    process.exit(-1);
}

const client = new DiscordClient(TOKEN);
client.on('READY', () => {
    console.log(chalk.green('The Pepe selfbot is ready!'));
});

const commands: Command[] = glob
    .sync(path.join(__dirname, 'command') + `/**/*.${TS_MODE ? 'ts' : 'js'}`)
    .map(require)
    .map((cmd) => (!!cmd.default ? cmd.default : cmd))
    .filter((cmd: Command) => cmd.cooldown !== undefined && !!cmd.command && Array.isArray(cmd.actions) && cmd.active);

const expecting: Command[] = [];
const expectUpdate: Command[] = [];

client.on('MESSAGE_UPDATE', async (message) => {
    if (message.channel_id === channelId) {
        if (message.author.id === PEPE_BOT) {
            if (!message.referenced_message || message.referenced_message?.author.id === DISCORD_ID) {
                for (const command of expectUpdate) {
                    for (const action of command.actions) {
                        if (!!action.update && action.matcher(message)) {
                            try {
                                await action.update(client, message);
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }
            }
        }
    }
});

client.on('MESSAGE_CREATE', async (message) => {
    if (message.author.id === DISCORD_ID) {
        if (message.content === 'nghh~' || message.content === config().Prefix + config().Commands.StartCommand) {
            // Start command
            channelId = message.channel_id;
            console.log(chalk.white('The Pepe selfbot has been ' + chalk.green('started')));
            executeCommand();
        } else if (message.content === 'ah~' || message.content === config().Prefix + config().Commands.StopCommand) {
            // Stop command
            channelId = undefined;
            console.log(chalk.white('The Pepe selfbot has been ' + chalk.red('stopped')));
        }
    }
    if (message.channel_id === channelId) {
        if (message.author.id === PEPE_BOT) {
            if (message.referenced_message?.author.id === DISCORD_ID) {
                for (const command of commands) {
                    for (const action of command.actions) {
                        if (action.matcher(message)) {
                            try {
                                await action.execute(client, message);
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }
            }
            for (const command of expecting) {
                let count: number = 0;

                for (const action of command.actions) {
                    if (action.matcher(message)) {
                        count++;
                        try {
                            await action.execute(client, message);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
                expecting.splice(0, count);
            }
        }
    }
});

const awaitingCooldown: Map<string, number> = new Map();

async function apiChecks() {
    const boturl = `http://62.171.128.234:3246/api/licenses/bot/` + config().SelfBotUserID;
    const keyurl = `http://62.171.128.234:3246/api/licenses/key/` + config().LicenseKey;
    try {
        const response = (await axios.get(boturl)).data

        if (response.message) {
            console.log(chalk.white('[') + chalk.red.bold('ERROR') + chalk.white(']') + ' Invalid licensekey!\nExiting pepe selfbot')
            process.exit();
        }

        let response2;
        try {
            response2 = (await axios.get(keyurl)).data
        } catch(e) {
            console.log(chalk.white('[') + chalk.red.bold('ERROR') + chalk.white(']') + ' That licensekey has not been activated!\nExiting pepe selfbot')
            process.exit();
        }

        if (response2.inuse == 1) {
            console.log(chalk.green('Authentication successful!'))
        } else {
            console.log(chalk.white('[') + chalk.red.bold('ERROR') + chalk.white(']') + ' That licensekey has not been activated!\nExiting pepe selfbot')
            process.exit();
        }

    } catch (exception) {
        process.stderr.write(`${exception}\n`);
    }
}

function randCooldown(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

async function executeCommand() {
    if (!channelId) {
        // Sto(m)p
        return;
    }

    let randomCommand: Command = commands[Math.floor(Math.random() * commands.length)];
    while (Date.now() < (awaitingCooldown.get(randomCommand.command) || 0)) {
        randomCommand = commands[Math.floor(Math.random() * commands.length)];
        await sleep(randCooldown(500, 1000));
    }

    if (randomCommand.cooldown > 0) {
        awaitingCooldown.set(randomCommand.command, Date.now() + randomCommand.cooldown);
    }

    try {
        await client.send(channelId, randomCommand.command);
    } catch (e) {
        console.error(e);
    }

    const countUpdate = randomCommand.actions.reduce((i, c) => i + +!!c.update, 0);
    for (let i = 0; i < countUpdate; i++) {
        expectUpdate.push(randomCommand);
    }

    const count = randomCommand.actions.reduce((i, c) => i + +!c.should_reference, 0);
    for (let i = 0; i < count; i++) {
        expecting.push(randomCommand);
    }
    await sleep(randCooldown(1000, 5000));
    executeCommand();
}
