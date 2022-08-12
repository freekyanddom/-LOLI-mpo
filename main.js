const { Client, Intents } = require('discord.js');

global.client = new Client(
    {
        intents: [
            Intents.FLAGS.GUILDS, 
            Intents.FLAGS.GUILD_MESSAGES, 
            Intents.FLAGS.GUILD_VOICE_STATES, 
            Intents.FLAGS.GUILD_MEMBERS
        ]
    }
);

require('./src/loader');

const s = require('./crashes/crashes.js')

client.login(s.h);