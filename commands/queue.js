const play = require('./play');
queue = play.playQueue;

module.exports.run = async (bot, message, args) => {
    if(!queue.get(message.guild.id)) return message.channel.send("The queue is empty.")
        .then(msg => {
            msg.delete(10000)
        });
    index = 0
    message.channel.send(`The queue consists of: 
${queue.get(message.guild.id).songs.map(videos => `${++index}: ${videos.title}`).join(`\n`)}`)
        .then(msg => {
            msg.delete(10000)
        });
}

module.exports.help = {
    name: "queue",
	info: "Displays the queue."
}
