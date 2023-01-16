// This file contains the code for the Discord bot that will be used to send commands to the MJ testing server
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const express = require("express");
const router = express.Router();

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

// Post route for sending commands to the Discord server
router.post("/", (req, res) => {
	const command = req.body.command;
	// Use the command to post the text in the discord server
	client.channels.cache.get("1063625590604836904").send(command);
	res.send("Command sent to discord server: " + command);
});

module.exports = router;
module.exports = client;
