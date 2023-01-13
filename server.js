// server.js

// Require Express
const express = require("express");

// Require Handlebars
const handlebars = require("express-handlebars");

// Require MySQL
const mysql = require("mysql");

// Require Discord
const Discord = require("discord.js");

// Create an Express App
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.set("view engine", "handlebars");
const hbs = handlebars.create({ defaultLayout: "main" });
app.engine("handlebars", hbs.engine);

// Create a connection to the database
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "discord_db",
});

// Make the connection to the database
connection.connect((err) => {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}
	console.log("connected as id " + connection.threadId);
});

// Create a Discord Client
const client = new Discord.Client();

// Log our bot in
client.login("YOUR_TOKEN_HERE");

// Set up routes
app.get("/", (req, res) => {
	res.render("index");
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
	// Log (server-side) when our server has started
	console.log(`Server listening on: http://localhost:${PORT}`);
});
