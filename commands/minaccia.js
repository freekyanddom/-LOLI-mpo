const { SlashCommandBuilder } = require('@discordjs/builders');
const { minacce } = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('minaccia')
    .setDescription('Minaccia un babuino')
    .addUserOption(option => 
        option.setName('membro')
        .setDescription('Babuino da minacciare')
        .setRequired(true)
    ),
    async execute(client, int) {
        const random = Math.floor(Math.random() * (minacce.length + 1));
        const member = int.options.getUser('membro');
        int.reply({ content: `${member} ${minacce[random]}` },);
    }
}