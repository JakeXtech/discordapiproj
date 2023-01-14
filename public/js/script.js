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
