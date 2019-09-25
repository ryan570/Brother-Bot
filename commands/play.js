const ytdl = require('ytdl-core');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const config = require('/home/god/Brother-Bot/config.json');
const youtube = new YouTube(config.api_key);
const Discord = module.require("discord.js");

module.exports.playQueue = queue;
module.exports.run = async (bot, message, args) => {
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("Please join a voice channel.");
    if(!args[0]) return message.channel.send("Please include a valid song link.");
    const serverQueue = queue.get(message.guild.id);
    const url = args.join(" ");
    try {
        var video = await youtube.getVideo(url);
    }
    catch (error) {
        try {
            var videos = await youtube.searchVideos(url, 5);
            let index = 0;
            let msg = await message.channel.send(`
__**Song Selection**__

${videos.map(video2 => `${++index}: **${video2.title}**`).join(`\n`)}

Please provide a value ranging from 1-5 to select a video.
            `);
            try {
                var response = await message.channel.awaitMessages(reply => reply.content > 0 && reply.content < 6, {
                    maxMatches: 1,
                    time: 10000,
                    errors: ['time']
                });
                msg.delete();
            }
            catch (err) {
                msg.delete();
                return message.channel.send("Missing or invalid value; cancelling video selection.")
                    .then(msg => {
                        msg.delete(10000)
                    });
            }
            const videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex-1].id);
        }
        catch(e) {
            console.error(e);
            return message.channel.send("No search results.");
        }
    }
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`
    };  

    if(!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5, 
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        }
        catch (error) {
            console.error(error);
            message.channel.send("I was unable to join the voice channel.");
            queue.delete(message.guild.id);
        }
        
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`**${song.title}** has been added to the queue.`)
            .then(msg => {
                msg.delete(10000)
            });
    }   
    return;

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));
    
function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        message.channel.send("I have finished playing the queue.")
            .then(msg => {
                msg.delete(10000)
            });
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
    });
    message.channel.send(`**${song.title}** is now playing.`)
        .then(msg => {
            msg.delete(10000)
        });
    dispatcher.setVolumeLogarithmic(5 / 5);
}   
}

module.exports.help = {
    name: "play",
	info: "Searches for and plays Youtube vidoes."
}
