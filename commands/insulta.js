const { SlashCommandBuilder } = require('@discordjs/builders');
const { insulti } = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('insulta')
    .setDescription('Insulta un beso del merda')
    .addUserOption(option => 
        option.setName('membro')
        .setDescription('beso del merda da insultare')
        .setRequired(true)
    ),
    async execute(client, int) {
        const random = Math.floor(Math.random() * (insulti.length + 1));
        const member = int.options.getUser('membro');
        int.reply({ content: `${insulti[random]} ${member}` });
    }
}