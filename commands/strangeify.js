module.exports.run = async (bot, message, args) => {
    var returnMessage = args.toString().split('').join(" ").replace(/ ,/g , "");
    var upperCaseMessage = returnMessage.toUpperCase();
    return message.channel.send(upperCaseMessage);
}

module.exports.help = {
    name: "strangeify",
	info: "Strangeifies the provided message."
}
