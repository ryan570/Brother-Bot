module.exports.run = async (bot, message, args) => {
        var random = Math.floor(Math.random() * parseInt(args)) + 1;
        if (Number.isInteger(random)) {
            message.channel.send(`You rolled a ${random}.`);
        }
        else {
            message.channel.send("Please specify a valid number.");
        }
}

module.exports.help = {
    name: "roll",
	info: "Rolls a die with the provided number of sides."
}
