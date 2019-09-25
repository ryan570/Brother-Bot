module.exports.run = async (bot, message, args) => {
    if(!message.guild.voiceConnection) {
        message.channel.send("I am not currently in a voice channel.")
            .then(msg => {
                msg.delete(10000)
            });
        return;
    }
    const voiceChannel = message.guild.voiceConnection.channel;
    voiceChannel.leave();
}

module.exports.help = {
    name: "stop",
	info: "Stops the queue."
}
