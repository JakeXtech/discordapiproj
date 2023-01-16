// server.js
const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const mysql = require("mysql");
const discordbot = require("./config/discordbot.js");
const app = express();
const port = process.env.PORT || 3001;
const fs = require("fs-extra");

//Set public/static files directory
app.use(express.static(path.join(__dirname, "public")));

// Set Handlebars as the default templating engine.
app.set("view engine", "handlebars");
const hbs = handlebars.create({ defaultLayout: "main" });
app.engine("handlebars", hbs.engine);

// Set up routes
app.get("/", (req, res) => {
	res.render("index");
});

//route for get request for all image in botdownloads folder
app.get("/images", (req, res) => {
	const directoryPath = path.join(__dirname, "public/botdownloads");
	const files = [];
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			return console.log("Unable to scan directory: " + err);
		}
		res.json(files);
	});
});

// Start our server so that it can begin listening to client requests.
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
