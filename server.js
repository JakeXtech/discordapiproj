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
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const spawner = require("child_process").spawn;
const promptCommand = "test output command";

app.post("/runPythonScript", async (req, res) => {
	const pythonProcess = spawner("python", [
		path.join(__dirname, "public/py/discord_bot.py"),
		promptCommand,
	]);
	console.log("Data sent to python script:", promptCommand);

	let data = "";
	pythonProcess.stdout.on("data", (part) => (data += part));
	await new Promise((resolve) => pythonProcess.stdout.on("close", resolve));

	console.log("Data send back from python script:", data.toString());
	res.json({ message: "Python finished", data: data });
});

// app.post("/runPythonScript", (req, res) => {
// 	const pythonProcess = spawner("python", [
// 		path.join(__dirname, "public/py/discord_bot.py"),
// 		promptCommand,
// 	]);
// 	console.log("Data sent to python script:", promptCommand);
// 	pythonProcess.stdout.on("data", (data) => {
// 		console.log("Data send back from python script:", data.toString());
// 		res.json({ message: "Python script is running" });
// 	});
// });

// Start our server so that it can begin listening to client requests.
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
