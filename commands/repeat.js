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
    queue.get(message.guild.id).songs.splice(1, 0, queue.get(message.guild.id).songs[0]);
    message.channel.send("The current song will repeat.")
        .then(msg => {
            msg.delete(10000)
        });
    return;
}

module.exports.help = {
    name: "repeat",
	info: "Repeats the currently playing song."
}
