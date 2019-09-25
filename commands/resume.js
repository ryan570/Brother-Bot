const play = require('./play');
queue = play.playQueue;

module.exports.run = async (bot, message, args) => {
    if(!queue.get(message.guild.id)) return message.channel.send("The queue is empty.")
        .then(msg => {
            msg.delete(10000)
        });
    if(queue.get(message.guild.id).playing) return message.channel.send("The queue is already playing.")
        .then(msg => {
            msg.delete(10000)
        });
    queue.get(message.guild.id).connection.dispatcher.resume();
    message.channel.send("I have unpaused the queue.")
        .then(msg => {
            msg.delete(10000)
        });
    queue.get(message.guild.id).playing = true;
    return;
    
}

module.exports.help = {
    name: "resume",
	info: "Resumes the queue."
}
