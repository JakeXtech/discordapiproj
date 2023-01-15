// server.js

// Require Express
const express = require("express");

// Require Path
const path = require("path");

// Require Handlebars
const handlebars = require("express-handlebars");

// Require MySQL
const mysql = require("mysql");

// Require discordbot.js
const discordbot = require("./config/discordbot.js");

// Create an Express App
const app = express();

//Set public/static files directory
app.use(express.static("/public"));
app.use(express.static(path.join(__dirname, "public")));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.set("view engine", "handlebars");
const hbs = handlebars.create({ defaultLayout: "main" });
app.engine("handlebars", hbs.engine);

// Set up routes
app.get("/", (req, res) => {
	res.render("index");
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
	// Log (server-side) when our server has started
	console.log(`Server listening on: http://localhost:${PORT}`);
});
