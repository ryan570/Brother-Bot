const fs = require("fs");

module.exports.run = async (bot, message, args) => {

var commands = [];
fs.readdir("/home/god/Brother-Bot/commands", (err, files) => {
	if(err) console.error(err);

	let jsFiles = files.filter(f => f.split(".").pop() === "js");
	if (jsFiles.length == 1) {
		message.channel.send("No commands found.");
		return;
	}
	jsFiles.forEach((f, i) => {
		let props = require("/home/god/Brother-Bot/commands/" + f);
		commands.push(props.help.name + ": " + props.help.info);
	});
	
	message.channel.send(`__**Commands:**__

${commands.join(`\n`)}`);
})

}

module.exports.help = {
	name: "help",
	info: "Displays helpful information."
}
