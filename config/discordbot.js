// This file contains the code for the Discord bot that will be used to send commands to the MJ testing server
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

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

//Event listener for when the bot is ready

client.once(Events.ClientReady, () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
	newMessage.attachments.forEach((attachment) => {
		if (attachment.url) {
			//Save file at attachment.url to /public/botdownloads
			axios({ url: attachment.url, responseType: "stream" }).then(
				(response) => {
					response.data.pipe(
						fs.createWriteStream(`public/botdownloads/${newMessage.id}.webp`)
					);
				}
			);
		}
	});
});
//Shitty event listener that is a mess
// client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
// 	newMessage.attachments.forEach((attachment) => {
// 		if (attachment.url && newMessage.editedTimestamp) {
// 			clearTimeout(timer);
// 			timer = setTimeout(() => {
// 				// Use tmp package to create a temp directory
// 				console.log(
// 					"This is the edited timestamp:" + newMessage.editedTimestamp
// 				);
// 				//download the image at attachment.url and save it to the temp directory
// 				request(attachment.url)
// 					.pipe(
// 						fs.createWriteStream(`temp/image${newMessage.editedTimestamp}.webp`)
// 					)
// 					.on("close", () => {
// 						console.log("Image downloaded to temp directory");
// 						//convert webp to png
// 						convertWebpToPng("/temp", "/outPNGs");
// 					});
// 			}, 14000);
// 		}
// 	});
// });

module.exports = client;
