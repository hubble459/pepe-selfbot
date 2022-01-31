import { APIButtonComponent } from 'discord-api-types';
import { Command } from '../type/command';
import { sleep } from '../util';

const command: Command = {
    command: 'pls work',
    cooldown: 36000000,
    actions: [
        {
            should_reference: true,
            matcher(msg) {
                return msg.content.includes('Color Match');
            },
            async execute(client, message) {
                const lines = message.content.split('\n');
                lines.unshift();
                console.log(lines);
                
                await sleep(3000);
                const button = (<APIButtonComponent[]>message.components![0].components).find(c => c.label?.startsWith(''));
                await client.clickButton(message, button as any);
            },
        },
        {
            should_reference: true,
            matcher(msg) {
                return msg.content.includes('Emoji Match');
            },
            async execute(client, message) {
                const emoji = message.content.split('\n')[1];
                console.log(emoji);
                
                await sleep(2000);
                const button = (<APIButtonComponent[]>[...message.components![0].components, ...message.components![1].components]).find(c => c.label === emoji);
                await client.clickButton(message, button as any);
            },
        },
    ],
};

export default command;
