module.exports.run = async (bot, message, args) => {
    message.member.voiceChannel.join();
}

module.exports.help = {
    name: "move",
    info: "Moves the bot to the users voice channel."
}