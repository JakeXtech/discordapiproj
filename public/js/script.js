const generateBtn = document.querySelector("#generate-graphic-btn");
generateBtn.addEventListener("click", function () {
	const { spawn } = require("child_process");
	const pyProg = spawn("python", ["/py/discord_bot.py"]);
	let command = document.querySelector("#command-input").value;
	pyProg.stdin.write(command + "\n");
	pyProg.stdin.end();
});

// function to retrieve the images from the server
function getImages() {
	fetch("/images")
		.then((response) => response.json())
		.then((files) => {
			// filter the files to only get the webp files
			let webpFiles = files.filter((file) => file.endsWith(".webp"));

			// sort the files by their name
			webpFiles
				.sort((a, b) => {
					return a.localeCompare(b);
				})
				.reverse();

			// update the images in the index.handlebars template
			let imageContainer = document.querySelector(".image-container");
			imageContainer.innerHTML = ""; // empty the container
			let image = document.createElement("img");
			image.src = `/botdownloads/${webpFiles[0]}`;
			imageContainer.appendChild(image);
		})
		.catch((error) => console.log(error));
}

function strategicRefresh() {
	location.href = location.href;
}

//Keep checking the images folder
setInterval(getImages, 5000);
