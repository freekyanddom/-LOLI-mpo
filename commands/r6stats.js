const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const R6 = require('r6s-stats-api');
const { loghi, thumbnails } = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('r6stats')
    .setDescription('Trackea un account di r6')
    .addStringOption(option => 
        option.setName('username')
        .setDescription('Inserisci il nome dell\'account')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('piattaforma')
        .setDescription('Inserisci la piattaforma')
        .setRequired(true)
    ),
    async execute(client, int) {
    let name = int.options.getString('username');
    let platform = int.options.getString('piattaforma');
    let general = await R6.general(platform, name)
    let rank = await R6.rank(platform, name)
    const embed = new MessageEmbed()
    .setAuthor({
        name: 'R6s Stats',
        iconURL: loghi.r6
    })
    .setColor('BLACK')
    .setThumbnail(thumbnails.r6)
    .setFooter({
        text: client.user.username, 
        iconURL: client.user.displayAvatarURL({ dynamic: true })
    })
    .addFields(
        {
            name: 'Username',
            value: `${general.name}`,
            inline: true,
        },
        {
            name: 'Livello',
            value: `${general.level}`,
            inline: true,
        },
        {
            name: 'KD',
            value: `${rank.kd}`,
            inline: true,
        },
        {
            name: 'Vittore',
            value: `${rank.wins}`,
            inline: true,
        },
        {
            name: 'Percentuale headshots',
            value: `${general.headshot_}`,
            inline: true,
        },
        {
            name: 'Kills',
            value: `${rank.kills}`,
            inline: true,
        },
        {
            name: 'Partite Giocate',
            value: `${rank.matches}`,
            inline: true,
        },
        {
            name: 'Tempo giocato',
            value: `${general.time_played}`,
            inline: true,
        },
        {
            name: 'Rank',
            value: `${rank.rank}`,
            inline: true,
        }
    )
    if (general == 'NOT_FOUND') {
        return int.reply({ content: 'Account non registrato', ephemeral: true});
    } else if (general == 'PLATFORM_ERROR') {
        return int.reply({ content: 'Piattaforma errata', ephemeral: true});
    }
    // console.log(general);
    int.reply({ embeds: [embed]})
    }
}