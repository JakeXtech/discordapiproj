const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Tusc0n11!!22@@",
	database: "mjdiscordapi_db",
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected to MySQL Database");
});

module.exports = connection;
