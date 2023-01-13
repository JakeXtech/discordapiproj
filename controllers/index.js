// Require the necessary packages
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const axios = require("axios");

// Set up the Discord client
client.on("ready", () => {
	console.log("Discord client is ready!");
});

// Set up the route for the index page
exports.index = (req, res) => {
	res.render("index", { title: "Discord API" });
};

// Set up the route for the post request
exports.post = (req, res) => {
	// Get the command from the request body
	const command = req.body.command;

	// Send the command to the Discord server
	client.channels.cache.get("<channel_id>").send(command);

	// Get the response from the Discord server
	client.on("message", (message) => {
		if (message.author.bot) {
			// Get the image from the response
			const image = message.attachments.first().url;

			// Cut the image into 4 equal parts
			axios.get(image).then((response) => {
				const imageData = response.data;
				const imageWidth = imageData.width;
				const imageHeight = imageData.height;
				const imageQuarterWidth = imageWidth / 4;
				const imageQuarterHeight = imageHeight / 4;

				// Create 4 new images from the original image
				const image1 = new MessageAttachment(
					imageData,
					`image1.png`
				).setAttachment(
					"image1.png",
					imageData.slice(0, imageQuarterWidth, 0, imageQuarterHeight)
				);
				const image2 = new MessageAttachment(
					imageData,
					`image2.png`
				).setAttachment(
					"image2.png",
					imageData.slice(
						imageQuarterWidth,
						imageQuarterWidth * 2,
						0,
						imageQuarterHeight
					)
				);
				const image3 = new MessageAttachment(
					imageData,
					`image3.png`
				).setAttachment(
					"image3.png",
					imageData.slice(
						imageQuarterWidth * 2,
						imageQuarterWidth * 3,
						0,
						imageQuarterHeight
					)
				);
				const image4 = new MessageAttachment(
					imageData,
					`image4.png`
				).setAttachment(
					"image4.png",
					imageData.slice(
						imageQuarterWidth * 3,
						imageWidth,
						0,
						imageQuarterHeight
					)
				);

				// Send the 4 images to the response
				res.send({
					image1,
					image2,
					image3,
					image4,
				});
			});
		}
	});
};
