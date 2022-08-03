import { APIButtonComponentWithCustomId, APISelectMenuComponent } from 'discord-api-types';
import { Command } from '../type/command';
import { sleep, config } from '../util';

let static_busy = false;

const command: Command = {
    command: 'pls stream',
    active: config().Commands.Stream.Enabled,
    cooldown: config().Commands.Stream.Timeout,
    actions: [{
        should_reference: false,
        matcher(msg) {
            return !!msg.embeds[0]?.author?.name.includes('Stream Manager');
        },
        async execute(client, message) {
            if (!!message.embeds[0]!.fields?.find(f => f.name === 'Live Since')) {
                const readChat = message.components![0].components[1] as APIButtonComponentWithCustomId;
                await client.clickButton(message, readChat);  
                await sleep(500);
                const endInteraction = message.components![1].components[1] as APIButtonComponentWithCustomId;
                await client.clickButton(message, endInteraction);                
            } else {
                const button = message.components![0]!.components[0] as APIButtonComponentWithCustomId;
                await client.clickButton(message, button);
            }
        },
        async update(client, message) {
            if (static_busy) {
                return;
            }
            const selectGame = !!message.embeds[0].description?.includes('What game do you want to stream');
            if (selectGame) {
                static_busy = true;
                const selectMenu = message.components![0].components[0] as APISelectMenuComponent;
                const randOption = selectMenu.options[Math.floor(Math.random() * selectMenu.options.length)];
                await client.selectMenuOption(message, selectMenu, randOption);
                await sleep(500);
                const startStream = message.components![1].components[0] as APIButtonComponentWithCustomId;
                await client.clickButton(message, startStream);
                static_busy = false;
            } else {
                const readChat = message.components![0].components[1] as APIButtonComponentWithCustomId;
                await client.clickButton(message, readChat);                
            }
        }
    }],
};

export default command;
