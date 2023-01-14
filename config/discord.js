const Discord = require("discord.js");
const client = new Discord.Client({
	intents: Discord.Intents.ALL,
});

// Replace the value of 'token' with my bot token
const token = env.process.TOKEN;

// Replace the value of 'channelID' with the ID of my MJ testing server channel you want your for the bot to send commands to
const channelID = "1063625590604836904";

// Replace the value of 'commandPrefix' with the prefix to use for your the commands
const commandPrefix = "/imagine prompt ";

// Replace the value of 'upscaleButtonID' with the ID of the button for bot to click when when send the 'upscale' command
const upscaleButtonID = "YOUR_UPSCALE_BUTTON_ID";

// Replace the value of 'variationsButtonID' with the ID of the button for our bot to click when sending the 'variations' command
const variationsButtonID = "YOUR_VARIATIONS_BUTTON_ID";

// Replace the value of 'addToProgramButtonID' with the ID of the button for our bot to click when we send the 'addToProgram' command
const addToProgramButtonID = "YOUR_ADD_TO_PROGRAM_BUTTON_ID";

//Event listener for when the bot is ready

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

//Event listener for when the bot receives a message
client.on("message", (message) => {
	if (message == "Hey") {
		message.reply("Hello!");
		console.log("bot it getting messages and talking back. :thumbsup:");
	}
});

client.on("message", (message) => {
	if (message.author.bot) return;
	if (message.content.startsWith(commandPrefix)) {
		const args = message.content.slice(commandPrefix.length).split(" ");
		const command = args.shift().toLowerCase();

		if (command === "upscale") {
			const channel = client.channels.get(channelID);
			channel.send("!upscale");
			const messageID = message.id;
			const reaction = message.reactions.get(upscaleButtonID);
			reaction.message.react(upscaleButtonID);
		}

		if (command === "variations") {
			const channel = client.channels.get(channelID);
			channel.send("!variations");
			const messageID = message.id;
			const reaction = message.reactions.get(variationsButtonID);
			reaction.message.react(variationsButtonID);
		}

		if (command === "addtoprogram") {
			const channel = client.channels.get(channelID);
			channel.send("!addtoprogram");
			const messageID = message.id;
			const reaction = message.reactions.get(addToProgramButtonID);
			reaction.message.react(addToProgramButtonID);
		}
	}
});

client.login(token);

module.exports = client;
