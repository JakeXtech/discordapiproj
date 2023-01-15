// This file contains the code for the Discord bot that will be used to send commands to the MJ testing server
const Discord = require("discord.js");

// Bring in dotenv to get the bot token from the .env file
require("dotenv").config();

// Create a new Discord client
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { env } = require("process");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// Replace the value of 'token' with my bot token
const TOKEN = process.env.TOKEN;

// Log our bot in
client.login(TOKEN);

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

client.once(Events.ClientReady, () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

//Event listener for when the bot receives a message
// client.on(Events.MessageCreate, (message) => {
// 	console.log(
// 		"the event listener for the messages is getting called in the first place"
// 	);
// 	if (message.content) {
// 		console.log("bot is getting messages, i.e. 'Hey'");
// 		message.channel.send("Hello!");
// 		console.log("bot is getting messages and talking back. :thumbsup:");
// 	}
// });

let timer = null;
client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
	// Only listen for updates in a specific channel
	newMessage.attachments.forEach((attachment) => {
		if (attachment.url) {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				console.log("Here is the attachment.url: ", attachment.url);
			}, 14000);
		}
	});
});
// 	webp.dwebp(
// 		"path/to/image.webp",
// 		"path/to/save/image.png",
// 		"-quiet -quiet",
// 		function (status, error) {
// 			console.log("Status: " + status);
// 			if (error) console.log("Error: " + error);
// 		}
// 	);
// });
// 	if (message.attachments)

// 		if (command === "upscale") {
// 			const channel = client.channels.get(channelID);
// 			channel.send("!upscale");
// 			const messageID = message.id;
// 			const reaction = message.reactions.get(upscaleButtonID);
// 			reaction.message.react(upscaleButtonID);
// 		}

// 		if (command === "variations") {
// 			const channel = client.channels.get(channelID);
// 			channel.send("!variations");
// 			const messageID = message.id;
// 			const reaction = message.reactions.get(variationsButtonID);
// 			reaction.message.react(variationsButtonID);
// 		}

// 		if (command === "addtoprogram") {
// 			const channel = client.channels.get(channelID);
// 			channel.send("!addtoprogram");
// 			const messageID = message.id;
// 			const reaction = message.reactions.get(addToProgramButtonID);
// 			reaction.message.react(addToProgramButtonID);
// 		}
// 	}
// });

module.exports = client;
