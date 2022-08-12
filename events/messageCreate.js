const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");
const discordTTS = require('discord-tts-spanish');
const a = new Set();
const audioPlayer = new AudioPlayer();
let voiceConnection;

module.exports = async (client, message) => {

    if (message.content == 'a' && message.author.id == '658759959118479360') {
        message.guild.commands.delete('1007707350985093260')
        .then(console.log)
        .catch(console.error);
    }

    const d = message.id

    //Check if user are bot or not
    if (message.author.bot) return;

    //Check the channel id
    if (message.channel.id == '949853839488602163') {
        let string = message.content;

        //Check how many long is the message
        if (string.length > 200 ) {
            return message.reply('Aoo che cazzo devi scrive, npoema? suca');
        }

        //Check if the message is a link
        if (message.content.includes('https')) {
            return message.reply('Se ne mandi un altro diocane ti inculo');
        }

        //Check if the message has or no mentions
        if (message.mentions.members.first()) {
            const username = message.mentions.members.first().user.username
            string = username + message.content.slice(21)
        }

        //Check if the message is a image
        if (message.attachments.size > 0) {
            return message.reply('non posso leggere le immagini fra...');
        }

        //Check if the message is a sticker or contain stickers
        if (message.stickers.size > 0) {
            return message.reply('ASUHDUIS, nun se posso legge li stickers :|');
        }

        //Check if the bot is playing another message
        if (a.size > 0) {
            return message.reply('Sto già riproducendo un messaggio, aspetta che finisco brutto negro').then(msg => {
                setTimeout(() => {
                    msg.delete()
                },5000)
            })
        } else {
            a.add(d)

            setTimeout(() => {
                a.delete(d)
            },3000)
        }

        //Get the message and connect to voicechannel
        const stream = discordTTS.getVoiceStream(string);
        const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
        if(!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected){
            voiceConnection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(audioResource);
            voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 1000 );
        }

        if (voiceConnection?.status === VoiceConnectionStatus.Connected) {
            voiceConnection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(audioResource);
        }
    }
}