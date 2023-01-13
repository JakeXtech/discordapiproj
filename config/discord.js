const Discord = require("discord.js");
const client = new Discord.Client();

// Replace the value of 'token' with your bot token
const token = "YOUR_BOT_TOKEN";

// Replace the value of 'channelID' with the ID of the channel you want your bot to post in
const channelID = "YOUR_CHANNEL_ID";

// Replace the value of 'commandPrefix' with the prefix you want to use for your bot commands
const commandPrefix = "!";

// Replace the value of 'upscaleButtonID' with the ID of the button you want your bot to click when you send the 'upscale' command
const upscaleButtonID = "YOUR_UPSCALE_BUTTON_ID";

// Replace the value of 'variationsButtonID' with the ID of the button you want your bot to click when you send the 'variations' command
const variationsButtonID = "YOUR_VARIATIONS_BUTTON_ID";

// Replace the value of 'addToProgramButtonID' with the ID of the button you want your bot to click when you send the 'addToProgram' command
const addToProgramButtonID = "YOUR_ADD_TO_PROGRAM_BUTTON_ID";

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
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
