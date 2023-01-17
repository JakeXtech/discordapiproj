// server.js
const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const mysql = require("mysql");
const discordbot = require("./config/discordbot.js");
const port = process.env.PORT || 3001;
const fs = require("fs-extra");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

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

//post route to send command from "generate-graphic-btn" event handler in script.js to python script
app.post("/runPythonScript", (req, res) => {
	let command = req.body.command;
	const pyProg = spawn("python", ["/py/discord_bot.py"]);
	pyProg.stdin.write(command + "\n");
	pyProg.stdin.end();
	res.json({ message: "Python script is running" });
});

// Start our server so that it can begin listening to client requests.
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
