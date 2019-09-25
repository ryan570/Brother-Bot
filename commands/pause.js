const play = require('./play');
queue = play.playQueue;

module.exports.run = async (bot, message, args) => {
    if(!queue.get(message.guild.id)) return message.channel.send("The queue is empty.")
        .then(msg => {
           msg.delete(10000)
        });
    if(!queue.get(message.guild.id).playing) return message.channel.send("The queue is already paused.")
        .then(msg => {
            msg.delete(10000)
        });
    queue.get(message.guild.id).connection.dispatcher.pause();
    message.channel.send("I have paused the queue.")
        .then(msg => {
            msg.delete(10000)
        });
    queue.get(message.guild.id).playing = false;
    return;
}

module.exports.help = {
    name: "pause",
	info: "Pauses the queue."
}
