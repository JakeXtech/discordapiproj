document
	.querySelector("#generate-graphic-btn")
	.addEventListener("click", function () {
		const commandInput = document.querySelector("#command-input").value;
		// Send the command to the server
		fetch("/", {
			method: "POST",
			body: JSON.stringify({
				command: commandInput,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((output) => {
				// Send the command to the discord bot
				axios
					.post("/discordbot", {
						command: commandInput,
					})
					.then((response) => {
						console.log("Command sent to discord bot: " + commandInput);
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => console.log(error));
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
