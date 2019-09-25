const config = require('./config.json');
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Map();

fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("No commands found.");
        return;
    }
    console.log(`Loading ${jsFiles.length} commands.`);

    jsFiles.forEach((f, i) => {
        let props = require("./commands/" + f);
        console.log(`${i + 1}: ${f} loaded.`);
        bot.commands.set(props.help.name, props);
    });
})

bot.on("ready", () => {
    console.log('Bot is ready!');
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.toUpperCase().includes("LUL")) message.channel.send("L U L")
        .then(msg => {
            msg.delete(10000)
        });
    if(message.content.includes("8)")) message.channel.send("8)")
        .then(msg => {
            msg.delete(10000)
        });
    if(message.content.toUpperCase().includes("QUACK")) message.channel.send("quack")
        .then(msg => {
            msg.delete(10000)
        });
    if(!message.content.startsWith(config.prefix)) return;
    
    let args = message.content.split(" ");
    let command = args[0];
    args = args.slice(1);
    
    let cmd = bot.commands.get(command.slice(config.prefix.length));
    if (cmd) cmd.run(bot, message, args);
    return;
});

process.on('uncaughtException', (err) => {
	console.log(`Caught exception: ${err}`);
});

bot.login(config.token);
