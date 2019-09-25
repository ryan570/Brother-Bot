const play = require('./play');
queue = play.playQueue;

module.exports.run = async (bot, message, args) => {
    if(!queue.get(message.guild.id)) return message.channel.send("The queue is empty.")
        .then(msg => {
            msg.delete(10000)
        });
    if(!queue.get(message.guild.id).playing) return message.channel.send("The queue is currently paused.")
        .then(msg => {
            msg.delete(10000)
        });
    queue.get(message.guild.id).connection.dispatcher.end();
    return;
}

module.exports.help = {
    name: "skip",
	info: "Skips the currently playing song."
}
