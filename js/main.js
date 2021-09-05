const doomsdayPlaceholder = "NO DATE SELECTED";

/**
 * @param {string} date
 * @returns {object}
 */
function extractDate(date) {
	const splitDate = date.split("-");
	return {
		day: Number(splitDate[2]),
		month: Number(splitDate[1]),
		year: Number(splitDate[0]),
	};
}

function dateOnChange(e) {
	const outputElem = document.getElementById("doomsday-text");
	if (e.value) {
		console.group("Extract the date:");
		console.log("Raw:", e.value);
		const date = extractDate(e.value);

		outputElem.innerText = e.value;

		console.log("Extracted:", date);
		console.groupEnd();
	} else {
		outputElem.innerText = doomsdayPlaceholder;
	}
}
