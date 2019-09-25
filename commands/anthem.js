const ytdl = require('ytdl-core');

module.exports.run = async(bot, message, args) => {
    var url = 'https://www.youtube.com/watch?v=YxIiPLVR6NA';
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("Please join a voice channel.");
    if(message.guild.voiceConnection) return message.channel.send("I am already in a voice channel.");
    
    var connection = await voiceChannel.join();
    message.channel.send("I am playing the Anthem of the Brotherhood.")
        .then(msg => {
            msg.delete(10000)
        });

    const dispatcher = connection.playStream(ytdl(url))
        .on('end', () => {
            voiceChannel.leave();
        });
    dispatcher.setVolumeLogarithmic(5 / 5);
}

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));

module.exports.help = {
	name: "anthem",
	info: "Plays the anthem of the Brotherhood."
}

