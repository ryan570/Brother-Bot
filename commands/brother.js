module.exports.run = async (bot, message, args) => {
    message.channel.send("Brother!");
}

module.exports.help = {
    name: "brother",
	info: "Brotherly love!"
}
