const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor("	#00FFFF")
            .addField("Full Username: ", message.author.tag)
            .addField("ID: ", message.author.id)
            .addField("Created At: ", message.author.createdAt)
            .setDescription("This is the user's info.");
        message.channel.send(embed);
        return;
}

module.exports.help = {
    name: "userinfo",
	info: "Displays info about the user."
}
