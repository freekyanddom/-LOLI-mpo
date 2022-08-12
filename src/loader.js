const { Collection } = require('discord.js')
const { readdirSync } = require('fs');
const AsciiTable = require('ascii-table');
const chalk = require('chalk');
let TableEvents = new AsciiTable();
let TableCommands = new AsciiTable();
TableEvents.setHeading('Events', 'Status').setBorder('║', '═');
TableCommands.setHeading('Commands', 'Status').setBorder('║', '═');

client.commands = new Collection();

const events = readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`../events/${file}`);
    TableEvents.addRow(file.split('.')[0], 'ready');
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};
console.log(chalk.magenta(TableEvents));

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    TableCommands.addRow(file.split('.')[0], 'ready');
    client.commands.set(command.data.name, command);
};
console.log(chalk.magenta(TableCommands));