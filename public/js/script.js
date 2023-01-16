async function generateGraphic() {
	const commandInput = document.querySelector("#command-input").value;
	const response = await fetch("/", {
		method: "POST",
		body: JSON.stringify({
			command: commandInput,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const output = await response.json();
	return output;
}

document
	.querySelector("#generate-graphic-btn")
	.addEventListener("click", generateGraphic);

// function to retrieve the images from the server
function getImages() {
	fetch("/images")
		.then((response) => response.json())
		.then((files) => {
			// filter the files to only get the webp files
			let webpFiles = files.filter((file) => file.endsWith(".webp"));

			// sort the files by their last modified time
			webpFiles.sort((a, b) => {
				return (
					new Date(b.lastModified).getTime() -
					new Date(a.lastModified).getTime()
				);
			});

			// update the images in the index.handlebars template
			let imageContainer = document.querySelector(".image-container");
			webpFiles.forEach((file) => {
				let image = document.createElement("img");
				image.src = `/botdownloads/${file}`;
				imageContainer.appendChild(image);
			});
		})
		.catch((error) => console.log(error));
}

// call the function to retrieve the images
getImages();
