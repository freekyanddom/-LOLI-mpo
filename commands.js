const s = require('./crashes/crashes.js')
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const clientId = '1007636986951110676';

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({
  version: '9'
}).setToken(s.h);

rest.put(Routes.applicationGuildCommands(clientId, '892875532725788703'), {
    body: commands
  })
  .then(() => console.log('Successfully registered application commands!'))
  .catch(console.error);