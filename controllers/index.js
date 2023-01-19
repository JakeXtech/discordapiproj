// Require the necessary packages
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const fs = require("fs-extra");

// Set up the route for the index page

router.get("/", (req, res) => {
	res.render("index", { title: "Graphic Engine" });
});

module.exports = router;
