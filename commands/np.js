const play = require('./play');
queue = play.playQueue;

module.exports.run = async (bot, message, args) => {
    if(!queue.get(message.guild.id)) return message.channel.send("There is nothing playing.")
        .then(msg => {
            msg.delete(10000)
        });
    message.channel.send(`**${queue.get(message.guild.id).songs[0].title}** is currently playing.`)
        .then(msg => {
           msg.delete(10000)
        });
    return;
}   

module.exports.help = {
    name: "np",
	info: "Displays the currently playing song."
}
